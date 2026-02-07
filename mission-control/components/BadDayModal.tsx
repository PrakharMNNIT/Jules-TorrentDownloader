import { motion, AnimatePresence } from "framer-motion";
import { AlertTriangle, Play, BookOpen, User, Zap, Shield, X } from "lucide-react";
import { useStore } from "@/lib/store";

export function BadDayModal() {
  const { badDayProtocol, setBadDayProtocol } = useStore();

  if (!badDayProtocol) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-[#050608]/80 backdrop-blur-[4px]"
      >
        <motion.div
           initial={{ scale: 0.95, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="glass-panel relative w-full max-w-2xl overflow-hidden rounded-xl border border-primary/40 shadow-[0_0_50px_-12px_rgba(37,106,244,0.3)] flex flex-col m-4"
        >
          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 bg-white/5 px-6 py-4">
            <div className="flex items-center gap-3">
              <div className="flex h-8 w-8 items-center justify-center rounded bg-red-500/20 text-red-500 animate-pulse">
                <AlertTriangle className="w-5 h-5" />
              </div>
              <div className="flex flex-col">
                <h3 className="text-sm font-bold tracking-[0.2em] text-white">BAD DAY PROTOCOL // PHASE 0-1</h3>
                <p className="text-[10px] uppercase text-red-400 font-bold tracking-wider">Emergency Override Active</p>
              </div>
            </div>
            {/* Dots */}
            <div className="flex gap-2">
              <div className="h-1.5 w-1.5 rounded-full bg-primary shadow-[0_0_8px_2px_rgba(37,106,244,0.8)]" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary/30" />
              <div className="h-1.5 w-1.5 rounded-full bg-primary/30" />
            </div>
          </div>

          {/* Body */}
          <div className="p-8 relative z-20">
            {/* Alert Banner */}
            <div className="mb-8 flex flex-col gap-2 border-l-2 border-primary bg-primary/10 p-4">
              <h2 className="text-2xl font-bold leading-tight text-white tracking-tight">EMERGENCY PROTOCOL ACTIVATED</h2>
              <p className="text-sm font-medium leading-normal text-gray-300">
                Energy reserves critically low. Standard operations suspended. Switching to minimal viable progress track to maintain streak integrity.
              </p>
            </div>

            {/* Tasks */}
            <div className="flex flex-col gap-4">
              <p className="text-xs uppercase tracking-widest text-[#9ca6ba] mb-1">Mandatory Directives</p>

              {/* Task 1 */}
              <div className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#1a1d24] p-4 transition-all hover:border-primary/50 hover:bg-[#1a1d24]/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#282e39] text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                    <Play className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Input Stream: Visual Learning</span>
                    <span className="text-xs text-[#9ca6ba]">Watch Arpit Bhayani System Design (15m)</span>
                  </div>
                </div>
                <button className="flex h-8 w-8 items-center justify-center rounded border border-[#3b4354] text-[#9ca6ba] hover:border-primary hover:text-primary transition-colors">
                  <Play className="w-4 h-4" />
                </button>
              </div>

               {/* Task 2 */}
               <div className="group flex items-center justify-between gap-4 rounded-lg border border-white/10 bg-[#1a1d24] p-4 transition-all hover:border-primary/50 hover:bg-[#1a1d24]/80">
                <div className="flex items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#282e39] text-primary group-hover:text-white group-hover:bg-primary transition-colors">
                    <BookOpen className="w-5 h-5" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-white">Data Ingestion: Textual</span>
                    <span className="text-xs text-[#9ca6ba]">Read Clean Code: Pages 45-50</span>
                  </div>
                </div>
                 <div className="flex items-center gap-3">
                    <div className="h-1.5 w-24 rounded-full bg-[#282e39]">
                        <div className="h-full w-1/3 rounded-full bg-primary"></div>
                    </div>
                    <span className="text-xs font-mono text-primary">33%</span>
                 </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between border-t border-white/10 bg-white/5 px-6 py-5 relative z-20">
            <button
                onClick={() => setBadDayProtocol(false)}
                className="text-xs font-medium text-[#9ca6ba] hover:text-white uppercase tracking-wider transition-colors"
            >
                Abort / Return to Standard Ops
            </button>
            <button
                className="flex items-center gap-2 rounded bg-primary px-6 py-2.5 text-sm font-bold text-white shadow-[0_0_15px_rgba(37,106,244,0.4)] transition-all hover:bg-blue-600 hover:shadow-[0_0_25px_rgba(37,106,244,0.6)]"
            >
                <Zap className="w-4 h-4" />
                EXECUTE PROTOCOL
            </button>
          </div>

          {/* Decor */}
          <div className="scanline absolute inset-0 z-10 pointer-events-none opacity-20" />
          <div className="absolute bottom-0 right-0 p-2 opacity-30 pointer-events-none z-10">
            <Shield className="w-24 h-24 text-white rotate-[-15deg] opacity-10" />
          </div>

        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
