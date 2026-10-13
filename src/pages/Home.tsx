import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { RefreshCw, UploadCloud } from "lucide-react";
import { useVideos } from "@/hooks/useVideos";
import VideoGrid from "@/components/video/VideoGrid";
import type { VideoWithUser } from "@/lib/api/videos";

const CATEGORIES = ["All", "Trending", "Clips", "Islamic", "Music", "Gaming", "News", "Sports"] as const;

export default function Home() {
  const [activeCategory, setActiveCategory] = useState<string>("All");
  const loadMoreRef = useRef<HTMLDivElement | null>(null);
  const queryCategory = activeCategory === "All" ? undefined : activeCategory.toLowerCase();
  const videosQuery = useVideos(queryCategory);

  const videos = useMemo<VideoWithUser[]>(
    () => videosQuery.data?.pages.flat() ?? [],
    [videosQuery.data],
  );

  const retry = useCallback(() => {
    void videosQuery.refetch();
  }, [videosQuery]);

  useEffect(() => {
    const target = loadMoreRef.current;
    if (!target || !videosQuery.hasNextPage || videosQuery.isFetchingNextPage || videosQuery.isError) return;

    const observer = new IntersectionObserver((entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        void videosQuery.fetchNextPage();
      }
    }, { rootMargin: "300px 0px" });

    observer.observe(target);
    return () => observer.disconnect();
  }, [videosQuery.hasNextPage, videosQuery.isFetchingNextPage, videosQuery.isError, videosQuery.fetchNextPage]);

  return (
    <section className="mx-auto w-full max-w-[1800px] space-y-6" aria-label="Home video feed">
      <div className="flex items-center justify-between gap-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-white sm:text-3xl">Discover</h1>
          <p className="mt-1 text-sm text-white/55">Find your next favourite video.</p>
        </div>
        <button
          type="button"
          onClick={retry}
          disabled={videosQuery.isFetching}
          className="inline-flex h-10 items-center gap-2 rounded-full border border-white/10 px-3 text-sm text-white/80 transition hover:border-white/25 hover:bg-white/5 disabled:opacity-50"
          aria-label="Refresh videos"
        >
          <RefreshCw className={`h-4 w-4 ${videosQuery.isFetching ? "animate-spin" : ""}`} aria-hidden="true" />
          <span className="hidden sm:inline">Refresh</span>
        </button>
      </div>

      <nav className="-mx-4 overflow-x-auto px-4 sm:-mx-6 sm:px-6" aria-label="Video categories">
        <div className="flex w-max min-w-full gap-2 border-b border-white/10 pb-3">
          {CATEGORIES.map((category) => {
            const active = activeCategory === category;
            return (
              <button
                key={category}
                type="button"
                onClick={() => setActiveCategory(category)}
                aria-pressed={active}
                className={`relative shrink-0 rounded-full px-4 py-2 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vexora-red ${active ? "bg-vexora-red/15 text-white after:absolute after:-bottom-[13px] after:left-3 after:right-3 after:h-0.5 after:rounded-full after:bg-vexora-red" : "text-white/60 hover:bg-white/5 hover:text-white"}`}
              >
                {category}
              </button>
            );
          })}
        </div>
      </nav>

      <VideoGrid
        videos={videos}
        isLoading={videosQuery.isPending}
        isError={videosQuery.isError}
        onRetry={retry}
      />

      {!videosQuery.isError && videos.length === 0 && !videosQuery.isPending && (
        <div className="-mt-2 flex flex-col items-center gap-3 text-center">
          <p className="max-w-md text-sm text-white/55">Be the first to share something with the VexoraTube community.</p>
          <Link
            to="/upload"
            className="inline-flex items-center gap-2 rounded-lg bg-vexora-red px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-red-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
          >
            <UploadCloud className="h-4 w-4" aria-hidden="true" />
            Upload your first video
          </Link>
        </div>
      )}

      {videosQuery.isFetchingNextPage && (
        <div className="flex items-center justify-center gap-3 py-5 text-sm text-white/60" role="status" aria-live="polite">
          <span className="h-5 w-5 animate-spin rounded-full border-2 border-white/20 border-t-vexora-red" aria-hidden="true" />
          Loading more videos…
        </div>
      )}

      {!videosQuery.isError && videosQuery.hasNextPage && !videosQuery.isFetchingNextPage && (
        <div ref={loadMoreRef} className="h-8" aria-hidden="true" />
      )}

      {!videosQuery.isError && videos.length > 0 && !videosQuery.hasNextPage && (
        <p className="py-5 text-center text-sm text-white/45">You’re all caught up.</p>
      )}
    </section>
  );
}
