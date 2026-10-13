import { supabase } from "@/lib/supabase";
import type { User, Video } from "@/types";

export type VideoWithUser = Video & {
  users: Pick<User, "username" | "avatar_url" | "full_name">;
};

export interface FetchVideosOptions {
  category?: string;
  limit?: number;
  offset?: number;
}

function normalizeCategory(category: string): string | undefined {
  const value = category.trim().toLowerCase();
  if (!value || value === "all" || value === "trending") return undefined;
  if (value === "clips") return "clips";
  return value;
}

export async function fetchVideos(options: FetchVideosOptions = {}): Promise<VideoWithUser[]> {
  const limit = Math.max(1, Math.min(options.limit ?? 20, 100));
  const offset = Math.max(0, options.offset ?? 0);
  const category = options.category?.trim().toLowerCase();

  let query = supabase
    .from("videos")
    .select("*")
    .eq("is_published", true);

  if (category === "trending") {
    query = query.order("views_count", { ascending: false });
  } else if (category === "clips") {
    query = query.eq("type", "clip").order("created_at", { ascending: false });
  } else {
    const normalized = options.category ? normalizeCategory(options.category) : undefined;
    if (normalized) query = query.eq("category", normalized);
    query = query.order("created_at", { ascending: false });
  }

  const { data: videos, error } = await query.range(offset, offset + limit - 1);
  if (error) throw new Error(`Failed to fetch videos: ${error.message}`);
  if (!videos?.length) return [];

  // The generated database types do not declare a videos -> users relationship,
  // so fetch the channel profiles separately instead of relying on an untyped join.
  const userIds = [...new Set(videos.map((video) => video.user_id))];
  const { data: users, error: usersError } = await supabase
    .from("users")
    .select("id, username, avatar_url, full_name")
    .in("id", userIds);

  if (usersError) throw new Error(`Failed to fetch video channels: ${usersError.message}`);

  const userById = new Map((users ?? []).map((user) => [user.id, user]));
  return videos.flatMap((video) => {
    const user = userById.get(video.user_id);
    if (!user) return [];
    return [{ ...video, users: { username: user.username, avatar_url: user.avatar_url, full_name: user.full_name } }];
  });
}

export async function fetchVideoById(id: string): Promise<VideoWithUser | null> {
  const { data: video, error } = await supabase
    .from("videos")
    .select("*")
    .eq("id", id)
    .eq("is_published", true)
    .maybeSingle();

  if (error) throw new Error(`Failed to fetch video: ${error.message}`);
  if (!video) return null;

  const { data: user, error: userError } = await supabase
    .from("users")
    .select("id, username, avatar_url, full_name")
    .eq("id", video.user_id)
    .maybeSingle();

  if (userError) throw new Error(`Failed to fetch video channel: ${userError.message}`);
  if (!user) return null;

  return { ...video, users: { username: user.username, avatar_url: user.avatar_url, full_name: user.full_name } };
}

export async function fetchVideosByCategory(category: "general" | "islamic"): Promise<VideoWithUser[]> {
  return fetchVideos({ category, limit: 20, offset: 0 });
}

export async function incrementViewCount(videoId: string): Promise<void> {
  const { data: video, error: readError } = await supabase
    .from("videos")
    .select("views_count")
    .eq("id", videoId)
    .maybeSingle();

  if (readError) throw new Error(`Failed to read video view count: ${readError.message}`);
  if (!video) throw new Error("Video not found.");

  const { error: updateError } = await supabase
    .from("videos")
    .update({ views_count: video.views_count + 1 })
    .eq("id", videoId);

  if (updateError) throw new Error(`Failed to increment video view count: ${updateError.message}`);
}
