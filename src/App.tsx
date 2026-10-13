import { Navigate, Route, Routes } from "react-router-dom";

function HomePage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-vexora-black px-6 text-center text-white">
      <section aria-labelledby="home-title" className="max-w-xl">
        <p className="mb-4 text-sm font-semibold uppercase tracking-[0.3em] text-islamic-gold">
          Video. Community. Connection.
        </p>
        <h1
          id="home-title"
          className="text-4xl font-bold tracking-tight text-vexora-red sm:text-6xl"
        >
          VexoraTube
        </h1>
        <p className="mt-5 text-lg text-white/75">
          Your video community is coming soon.
        </p>
      </section>
    </main>
  );
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
  );
}
