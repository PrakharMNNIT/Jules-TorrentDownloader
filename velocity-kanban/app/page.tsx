import { BoardCanvas } from "@/components/Board/BoardCanvas";
import { Zap, Wifi } from "lucide-react";

export default function Home() {
  return (
    <main className="flex h-screen flex-col bg-vk-bg overflow-hidden">
      {/* Top Bar */}
      <header className="h-16 border-b border-vk-secondary/20 flex items-center justify-between px-6 bg-white/50 backdrop-blur-sm shrink-0 z-10">
        <div className="flex items-center gap-3">
          <div className="bg-vk-primary/10 p-2 rounded-lg">
            <Zap className="text-vk-primary" size={20} />
          </div>
          <div>
            <h1 className="font-heading font-bold text-lg text-vk-text leading-none">Velocity Kanban</h1>
            <p className="font-mono text-[10px] text-vk-secondary uppercase tracking-widest mt-0.5">Local-First Engine</p>
          </div>
        </div>

        <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 border border-slate-200">
                <Wifi size={14} className="text-vk-success" />
                <span className="text-xs font-medium text-slate-600">Online</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-vk-primary to-vk-secondary shadow-md" />
        </div>
      </header>

      {/* Board Area */}
      <div className="flex-1 overflow-hidden relative">
        <div className="absolute inset-0 bg-[radial-gradient(#0D9488_1px,transparent_1px)] [background-size:24px_24px] opacity-[0.03] pointer-events-none" />

        {/* We hardcode board-1 for MVP Solo Journey */}
        <BoardCanvas boardId="board-1" />
      </div>
    </main>
  );
}
