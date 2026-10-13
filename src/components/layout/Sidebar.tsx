import type { ReactNode } from "react";
import {
  Bell, BookOpen, Clock3, Home, ListVideo, MessageCircle, Moon,
  Settings, Upload, Users, Zap,
} from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";

interface SidebarProps {
  onNavigate?: () => void;
}

interface NavigationItem {
  label: string;
  to: string;
  icon: ReactNode;
  requiresAuth?: boolean;
}

export default function Sidebar({ onNavigate, mobile = false }: SidebarProps) {
  const { user } = useAuth();
  const items: NavigationItem[] = [
    { label: "Home", to: "/", icon: <Home size={21} /> },
    { label: "Clips", to: "/clips", icon: <Zap size={21} /> },
    { label: "Islamic", to: "/islamic", icon: <Moon size={21} /> },
    { label: "Posts", to: "/posts", icon: <Users size={21} /> },
    { label: "Chats", to: "/chats", icon: <MessageCircle size={21} />, requiresAuth: true },
    { label: "Subscriptions", to: "/subscriptions", icon: <Bell size={21} />, requiresAuth: true },
    { label: "History", to: "/history", icon: <Clock3 size={21} />, requiresAuth: true },
    { label: "Playlists", to: "/playlists", icon: <ListVideo size={21} />, requiresAuth: true },
    { label: "Upload", to: "/upload", icon: <Upload size={21} />, requiresAuth: true },
    { label: "Settings", to: "/settings", icon: <Settings size={21} />, requiresAuth: true },
  ];

  return (
    <aside className={mobile ? "flex w-full flex-col bg-vexora-black text-white" : "hidden lg:fixed lg:inset-y-14 lg:left-0 lg:z-30 lg:flex lg:w-60 lg:flex-col lg:border-r lg:border-gray-800 lg:bg-vexora-black lg:text-white"}>
      <nav aria-label="Main navigation" className="flex-1 overflow-y-auto px-3 py-4">
        <div className="space-y-1">
          {items.filter((item) => !item.requiresAuth || user).map((item) => (
            <NavLink
              key={item.to}
              to={item.to}
              end={item.to === "/"}
              onClick={onNavigate}
              className={({ isActive }) => `flex min-h-11 items-center gap-4 rounded-lg px-3 text-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vexora-red ${isActive ? "bg-red-500/15 font-semibold text-vexora-red" : "text-gray-200 hover:bg-white/10"}`}
            >
              <span aria-hidden="true">{item.icon}</span>
              <span>{item.label}</span>
            </NavLink>
          ))}
        </div>
        {!user && (
          <div className="mt-5 border-t border-gray-800 pt-5">
            <p className="px-3 text-sm text-gray-300">Sign in to like videos, chat, upload and more.</p>
            <Link to="/login" onClick={onNavigate} className="mt-3 inline-flex min-h-10 items-center justify-center rounded-full border border-blue-400 px-5 text-sm font-semibold text-blue-300 hover:bg-blue-400/10">Sign in</Link>
          </div>
        )}
        <div className="mt-5 border-t border-gray-800 px-3 pt-4 text-xs text-gray-500">
          <p className="font-semibold text-gray-400"><BookOpen size={13} className="mr-1 inline" aria-hidden="true" />VexoraTube</p>
          <p className="mt-2">Discover videos, clips and community posts.</p>
        </div>
      </nav>
    </aside>
  );
}