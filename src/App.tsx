import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import ProtectedRoute from "@/components/auth/ProtectedRoute";
import Home from "@/pages/Home";
import Login from "@/pages/Login";
import Signup from "@/pages/Signup";
import ForgotPassword from "@/pages/ForgotPassword";
import ProfileSetup from "@/pages/ProfileSetup";
import Dashboard from "@/pages/Dashboard";
import Watch from "@/pages/Watch";
import Clips from "@/pages/Clips";
import Upload from "@/pages/Upload";
import Channel from "@/pages/Channel";
import Chats from "@/pages/Chats";
import Chat from "@/pages/Chat";
import Islamic from "@/pages/Islamic";
import Notifications from "@/pages/Notifications";
import Profile from "@/pages/Profile";
import Settings from "@/pages/Settings";
import Search from "@/pages/Search";
import Posts from "@/pages/Posts";
import CreatePost from "@/pages/CreatePost";
import GoLive from "@/pages/GoLive";
import LiveStream from "@/pages/LiveStream";
import NotFound from "@/pages/NotFound";

function PublicOnly() {
  const { user, loading } = useAuth();
  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-vexora-black text-white">
        <span className="h-10 w-10 animate-spin rounded-full border-4 border-white/20 border-t-vexora-red" role="status" aria-label="Loading" />
      </main>
    );
  }
  return user ? <Navigate to="/dashboard" replace /> : <Outlet />;
}

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route element={<PublicOnly />}>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Route>
      <Route path="/forgot-password" element={<ForgotPassword />} />
      <Route element={<ProtectedRoute />}>
        <Route path="/profile-setup" element={<ProfileSetup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/upload" element={<Upload />} />
        <Route path="/chats" element={<Chats />} />
        <Route path="/chat/:id" element={<Chat />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/create-post" element={<CreatePost />} />
        <Route path="/go-live" element={<GoLive />} />
      </Route>
      <Route path="/watch/:id" element={<Watch />} />
      <Route path="/clips" element={<Clips />} />
      <Route path="/channel/:username" element={<Channel />} />
      <Route path="/islamic" element={<Islamic />} />
      <Route path="/search" element={<Search />} />
      <Route path="/posts" element={<Posts />} />
      <Route path="/live/:id" element={<LiveStream />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}
