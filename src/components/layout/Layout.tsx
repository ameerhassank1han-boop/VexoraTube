import { useCallback, useState } from "react";
import { Outlet } from "react-router-dom";
import Header from "@/components/layout/Header";
import Sidebar from "@/components/layout/Sidebar";
import BottomNav from "@/components/layout/BottomNav";
import MobileDrawer from "@/components/layout/MobileDrawer";

export default function Layout() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const closeDrawer = useCallback(() => setDrawerOpen(false), []);
  const openDrawer = useCallback(() => setDrawerOpen(true), []);

  return (
    <div className="min-h-screen bg-vexora-black text-white">
      <Header onMenuClick={openDrawer} />
      <Sidebar />
      <MobileDrawer open={drawerOpen} onClose={closeDrawer} />
      <main className="min-h-[calc(100vh-7rem)] px-4 pb-20 pt-14 sm:px-6 lg:ml-60 lg:pb-8">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}