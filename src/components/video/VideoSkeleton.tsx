export default function VideoSkeleton() {
  return (
    <div className="min-w-0 animate-pulse" aria-hidden="true">
      <div className="aspect-video rounded-xl bg-white/10" />
      <div className="mt-3 flex gap-3">
        <div className="h-10 w-10 shrink-0 rounded-full bg-white/10" />
        <div className="min-w-0 flex-1 space-y-2 pt-1">
          <div className="h-4 w-11/12 rounded bg-white/10" />
          <div className="h-4 w-2/3 rounded bg-white/10" />
          <div className="h-3 w-1/2 rounded bg-white/10" />
        </div>
      </div>
      <span className="sr-only">Loading video</span>
    </div>
  );
}
