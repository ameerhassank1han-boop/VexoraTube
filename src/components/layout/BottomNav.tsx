import { Home, MessageCircle, Moon, Plus, UserRound, Zap } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

export default function BottomNav() {
  const { user } = useAuth();
  const profileDestination = user ? "/chats" : "/login";
  const profileLabel = user ? "Chats" : "Sign in";

  return (
    <nav aria-label="Mobile navigation" className="fixed inset-x-0 bottom-0 z-50 flex h-14 items-center justify-around border-t border-gray-800 bg-vexora-black/95 px-1 pb-[env(safe-area-inset-bottom)] text-gray-400 backdrop-blur lg:hidden">
      <NavLink to="/" end aria-label="Home" className={({ isActive }) => `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] ${isActive ? "text-vexora-red" : "hover:text-white"}`}>
        <Home size={21} aria-hidden="true" /><span>Home</span>
      </NavLink>
      <NavLink to="/clips" aria-label="Clips" className={({ isActive }) => `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] ${isActive ? "text-vexora-red" : "hover:text-white"}`}>
        <Zap size={21} aria-hidden="true" /><span>Clips</span>
      </NavLink>
      <Link to={user ? "/upload" : "/login"} aria-label={user ? "Upload video" : "Sign in to upload"} className="flex min-w-0 flex-1 -translate-y-2 flex-col items-center justify-center gap-1 text-[10px] text-gray-300">
        <span className="flex h-12 w-12 items-center justify-center rounded-full bg-vexora-red text-white shadow-lg shadow-red-950/50 transition hover:bg-red-700"><Plus size={27} strokeWidth={2.5} aria-hidden="true" /></span>
        <span>{user ? "Upload" : "Create"}</span>
      </Link>
      <NavLink to="/islamic" aria-label="Islamic" className={({ isActive }) => `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] ${isActive ? "text-vexora-red" : "hover:text-white"}`}>
        <Moon size={21} aria-hidden="true" /><span>Islamic</span>
      </NavLink>
      <NavLink to={profileDestination} aria-label={profileLabel} className={({ isActive }) => `flex min-w-0 flex-1 flex-col items-center justify-center gap-1 text-[10px] ${isActive ? "text-vexora-red" : "hover:text-white"}`}>
        {user ? <MessageCircle size={21} aria-hidden="true" /> : <UserRound size={21} aria-hidden="true" />}
        <span>{profileLabel}</span>
      </NavLink>
    </nav>
  );
}