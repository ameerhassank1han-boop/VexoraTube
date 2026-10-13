import { useNavigate } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { formatDate, formatDuration, formatNumber } from "@/utils/format";
import type { VideoWithUser } from "@/lib/api/videos";

interface VideoCardProps {
  video: VideoWithUser;
}

export default function VideoCard({ video }: VideoCardProps) {
  const navigate = useNavigate();
  const channelName = video.users.full_name?.trim() || video.users.username;

  return (
    <article
      className="group min-w-0 cursor-pointer rounded-xl outline-none transition duration-200 focus-within:ring-2 focus-within:ring-vexora-red"
      onClick={() => navigate(`/watch/${video.id}`)}
    >
      <button
        type="button"
        className="block w-full rounded-xl text-left focus-visible:outline-none"
        onClick={() => navigate(`/watch/${video.id}`)}
        aria-label={`Watch ${video.title}`}
      >
        <div className="relative aspect-video overflow-hidden rounded-xl border border-white/5 bg-white/5 transition duration-200 group-hover:scale-[1.01] group-hover:border-vexora-red/70">
          {video.thumbnail_url ? (
            <img
              src={video.thumbnail_url}
              alt={`Thumbnail for ${video.title}`}
              loading="lazy"
              className="h-full w-full object-cover transition duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-white/40">
              No thumbnail available
            </div>
          )}
          {video.duration !== null && video.duration > 0 && (
            <span className="absolute bottom-2 right-2 rounded bg-black/90 px-1.5 py-0.5 text-xs font-semibold text-white">
              {formatDuration(video.duration)}
            </span>
          )}
        </div>
        <div className="mt-3 flex gap-3">
          {video.users.avatar_url ? (
            <img
              src={video.users.avatar_url}
              alt=""
              loading="lazy"
              className="h-10 w-10 shrink-0 rounded-full bg-white/10 object-cover"
            />
          ) : (
            <span
              className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-vexora-red/20 text-sm font-semibold text-white"
              aria-hidden="true"
            >
              {channelName.charAt(0).toUpperCase()}
            </span>
          )}
          <div className="min-w-0 flex-1">
            <h2 className="line-clamp-2 break-words text-sm font-semibold leading-5 text-white transition-colors group-hover:text-red-300 sm:text-base">
              {video.title}
            </h2>
            <p className="mt-1 flex items-center gap-1 truncate text-sm text-white/60">
              <span className="truncate">{channelName}</span>
              {video.users.full_name && video.users.username && (
                <CheckCircle2 className="h-3.5 w-3.5 shrink-0 text-white/50" aria-label="Channel profile" />
              )}
            </p>
            <p className="mt-1 text-xs text-white/50">
              {formatNumber(video.views_count)} views <span aria-hidden="true">·</span> {formatDate(video.created_at)}
            </p>
          </div>
        </div>
      </button>
    </article>
  );
}
