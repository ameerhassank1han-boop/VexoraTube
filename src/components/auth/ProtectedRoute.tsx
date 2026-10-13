import type { ReactNode } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface ProtectedRouteProps {
  children?: ReactNode;
}

export default function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-vexora-black text-white">
        <div className="flex flex-col items-center gap-3" role="status" aria-live="polite">
          <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-vexora-red" />
          <span className="text-sm text-white/75">Loading your account…</span>
        </div>
      </main>
    );
  }

  if (!user) return <Navigate to="/login" replace />;
  return <>{children ?? <Outlet />}</>;
}
