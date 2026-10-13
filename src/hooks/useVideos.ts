import { useInfiniteQuery, useQuery } from "@tanstack/react-query";
import { fetchVideoById, fetchVideos, type VideoWithUser } from "@/lib/api/videos";

const PAGE_SIZE = 20;
const STALE_TIME = 60_000;

export function useVideos(category?: string) {
  return useInfiniteQuery<VideoWithUser[], Error>({
    queryKey: ["videos", category ?? "all"],
    queryFn: ({ pageParam }) => fetchVideos({
      category,
      limit: PAGE_SIZE,
      offset: typeof pageParam === "number" ? pageParam : 0,
    }),
    initialPageParam: 0,
    getNextPageParam: (lastPage, allPages) =>
      lastPage.length === PAGE_SIZE ? allPages.reduce((total, page) => total + page.length, 0) : undefined,
    staleTime: STALE_TIME,
    gcTime: 5 * 60_000,
    retry: 1,
  });
}

export function useVideo(id: string) {
  return useQuery<VideoWithUser | null, Error>({
    queryKey: ["video", id],
    queryFn: () => fetchVideoById(id),
    enabled: id.length > 0,
    staleTime: STALE_TIME,
    gcTime: 5 * 60_000,
    retry: 1,
  });
}
