export default function NotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-vexora-black px-6 text-center text-white">
      <div>
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-vexora-red">404</p>
        <h1 className="mt-3 text-3xl font-bold">Page not found</h1>
        <p className="mt-3 text-white/70">The page you requested could not be found.</p>
      </div>
    </main>
  );
}
