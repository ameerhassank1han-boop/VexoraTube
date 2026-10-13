import { AlertCircle, Film } from "lucide-react";
import type { VideoWithUser } from "@/lib/api/videos";
import VideoCard from "@/components/video/VideoCard";
import VideoSkeleton from "@/components/video/VideoSkeleton";

interface VideoGridProps {
  videos: VideoWithUser[];
  isLoading?: boolean;
  isError?: boolean;
  onRetry?: () => void;
}

export default function VideoGrid({ videos, isLoading = false, isError = false, onRetry }: VideoGridProps) {
  if (isLoading) {
    return (
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4" aria-label="Loading videos">
        {Array.from({ length: 8 }, (_, index) => <VideoSkeleton key={index} />)}
      </div>
    );
  }

  if (isError) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-white/10 bg-white/[0.03] px-5 text-center" role="alert">
        <AlertCircle className="h-9 w-9 text-vexora-red" aria-hidden="true" />
        <p className="font-semibold text-white">Failed to load videos</p>
        <p className="text-sm text-white/55">Check your connection and try again.</p>
        {onRetry && (
          <button type="button" onClick={onRetry} className="rounded-lg bg-vexora-red px-4 py-2 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white">
            Try again
          </button>
        )}
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex min-h-56 flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-white/15 bg-white/[0.02] px-5 text-center">
        <Film className="h-10 w-10 text-white/35" aria-hidden="true" />
        <p className="font-semibold text-white">No videos yet</p>
        <p className="max-w-sm text-sm text-white/55">Published videos will show up here. Check back soon for something to watch.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {videos.map((video) => <VideoCard key={video.id} video={video} />)}
    </div>
  );
}
