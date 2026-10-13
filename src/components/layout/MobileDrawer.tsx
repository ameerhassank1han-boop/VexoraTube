import { useEffect } from "react";
import { X } from "lucide-react";
import Sidebar from "@/components/layout/Sidebar";

interface MobileDrawerProps {
  open: boolean;
  onClose: () => void;
}

export default function MobileDrawer({ open, onClose }: MobileDrawerProps) {
  useEffect(() => {
    if (!open) return;
    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") onClose();
    }
    document.addEventListener("keydown", handleKeyDown);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = previousOverflow;
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-[60] lg:hidden ${open ? "pointer-events-auto" : "pointer-events-none"}`} aria-hidden={!open}>
      <button type="button" tabIndex={open ? 0 : -1} aria-label="Close navigation menu" onClick={onClose} className={`absolute inset-0 h-full w-full bg-black/60 transition-opacity duration-300 ${open ? "opacity-100" : "opacity-0"}`} />
      <section role="dialog" aria-modal="true" aria-label="Navigation menu" className={`absolute inset-y-0 left-0 flex w-[min(19rem,85vw)] flex-col border-r border-gray-800 bg-vexora-black text-white shadow-2xl transition-transform duration-300 ease-out ${open ? "translate-x-0" : "-translate-x-full"}`}>
        <div className="flex h-14 shrink-0 items-center justify-between border-b border-gray-800 px-4">
          <span className="flex items-center gap-2 font-bold"><span className="flex h-8 w-8 items-center justify-center rounded-md bg-vexora-red text-xl font-black">V</span>Vexora<span className="text-vexora-red">Tube</span></span>
          <button type="button" onClick={onClose} aria-label="Close menu" className="flex h-10 w-10 items-center justify-center rounded-full hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-vexora-red"><X size={22} /></button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <div className="lg:hidden">
            <Sidebar onNavigate={onClose} />
          </div>
          <nav aria-label="Mobile main navigation" className="px-3 py-4">
            <p className="px-3 pb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">Explore</p>
            <a href="https://github.com/ameerhassank1han-boop/VexoraTube" target="_blank" rel="noreferrer" className="block rounded-lg px-3 py-3 text-sm text-gray-300 hover:bg-white/10">About VexoraTube ↗</a>
          </nav>
        </div>
      </section>
    </div>
  );
}