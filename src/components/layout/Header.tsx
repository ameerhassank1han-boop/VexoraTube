import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Bell,
  ChevronDown,
  Menu,
  Search,
  Upload,
  UserRound,
  X,
} from "lucide-react";
import { useAuth } from "@/contexts/AuthContext";

interface HeaderProps {
  onMenuClick: () => void;
}

export default function Header({ onMenuClick }: HeaderProps) {
  const { user, profile, signOut } = useAuth();
  const [searchOpen, setSearchOpen] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [query, setQuery] = useState("");
  const navigate = useNavigate();

  function submitSearch(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const trimmedQuery = query.trim();
    if (trimmedQuery) {
      navigate(`/search?q=${encodeURIComponent(trimmedQuery)}`);
      setSearchOpen(false);
    }
  }

  const avatarUrl = profile?.avatar_url;
  const displayName = profile?.username ?? user?.email ?? "Your account";

  return (
    <header className="fixed inset-x-0 top-0 z-50 h-14 border-b border-gray-800 bg-vexora-black/95 text-white shadow-sm backdrop-blur">
      <div className="flex h-full items-center gap-3 px-3 sm:px-4">
        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onMenuClick}
            className="inline-flex h-10 w-10 items-center justify-center rounded-full text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vexora-red lg:hidden"
            aria-label="Open navigation menu"
          >
            <Menu size={23} aria-hidden="true" />
          </button>
          <Link to="/" className="flex items-center gap-2 rounded focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vexora-red" aria-label="VexoraTube home">
            <span className="flex h-8 w-8 items-center justify-center rounded-md bg-vexora-red text-xl font-black text-white">V</span>
            <span className="hidden text-lg font-bold tracking-tight sm:inline">Vexora<span className="text-vexora-red">Tube</span></span>
          </Link>
        </div>

        <form onSubmit={submitSearch} role="search" className={`${searchOpen ? "absolute inset-x-3 top-1.5 z-10 flex bg-vexora-black" : "hidden"} flex-1 items-center lg:relative lg:inset-auto lg:flex lg:max-w-2xl lg:mx-auto`}>
          <label htmlFor="header-search" className="sr-only">Search VexoraTube</label>
          <input
            id="header-search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search"
            className="h-10 min-w-0 flex-1 rounded-l-full border border-gray-700 bg-vexora-dark px-4 text-sm text-white outline-none placeholder:text-gray-400 focus:border-blue-500"
          />
          <button type="submit" aria-label="Submit search" className="flex h-10 w-12 items-center justify-center rounded-r-full border border-l-0 border-gray-700 bg-white/5 hover:bg-white/10">
            <Search size={19} aria-hidden="true" />
          </button>
          {searchOpen && (
            <button type="button" onClick={() => setSearchOpen(false)} aria-label="Close search" className="ml-2 flex h-9 w-9 items-center justify-center rounded-full hover:bg-white/10 lg:hidden">
              <X size={20} aria-hidden="true" />
            </button>
          )}
        </form>

        <div className={`${searchOpen ? "hidden" : "ml-auto"} flex shrink-0 items-center gap-1 sm:gap-2`}>
          <button type="button" onClick={() => setSearchOpen(true)} aria-label="Open search" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 lg:hidden">
            <Search size={21} aria-hidden="true" />
          </button>
          {user ? (
            <>
              <Link to="/upload" aria-label="Upload" className="hidden h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 sm:flex">
                <Upload size={21} aria-hidden="true" />
              </Link>
              <Link to="/notifications" aria-label="Notifications" className="relative flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10">
                <Bell size={21} aria-hidden="true" />
                <span className="absolute right-2 top-2 h-2 w-2 rounded-full border border-vexora-black bg-vexora-red" aria-label="New notifications" />
              </Link>
              <div className="relative">
                <button type="button" onClick={() => setProfileMenuOpen((open) => !open)} aria-expanded={profileMenuOpen} aria-label="Open profile menu" className="flex h-10 items-center gap-1 rounded-full p-1 hover:bg-white/10">
                  {avatarUrl ? (
                    <img src={avatarUrl} alt="" className="h-8 w-8 rounded-full object-cover" />
                  ) : (
                    <span className="flex h-8 w-8 items-center justify-center rounded-full bg-vexora-dark text-white"><UserRound size={18} aria-hidden="true" /></span>
                  )}
                  <ChevronDown size={15} className="hidden sm:block" aria-hidden="true" />
                </button>
                {profileMenuOpen && (
                  <div className="absolute right-0 top-12 w-56 rounded-xl border border-gray-700 bg-vexora-dark p-2 shadow-xl">
                    <p className="truncate px-3 py-2 text-sm text-gray-300">{displayName}</p>
                    <Link to="/profile" onClick={() => setProfileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-white/10">Your profile</Link>
                    <Link to="/settings" onClick={() => setProfileMenuOpen(false)} className="block rounded-lg px-3 py-2 text-sm hover:bg-white/10">Settings</Link>
                    <button type="button" onClick={async () => { setProfileMenuOpen(false); await signOut(); navigate("/login"); }} className="w-full rounded-lg px-3 py-2 text-left text-sm text-red-400 hover:bg-white/10">Sign out</button>
                  </div>
                )}
              </div>
            </>
          ) : (
            <Link to="/login" className="rounded-full bg-white px-4 py-2 text-sm font-semibold text-black transition hover:bg-gray-200">Sign in</Link>
          )}
        </div>
      </div>
    </header>
  );
}