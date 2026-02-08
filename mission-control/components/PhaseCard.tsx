import { motion } from "framer-motion";
import { CheckCircle2, Lock, Loader2, Settings } from "lucide-react";
import { cn } from "@/lib/utils";
import { type Phase, useStore } from "@/lib/store";

interface PhaseCardProps {
  phase: Phase;
  index: number;
}

export function PhaseCard({ phase, index }: PhaseCardProps) {
  const { adminMode } = useStore();
  const isLocked = phase.status === 'locked';
  const isActive = phase.status === 'active';
  const isDone = phase.status === 'completed';

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className={cn(
        "rounded-xl p-5 flex flex-col justify-between h-48 relative overflow-hidden group transition-all duration-200",
        isLocked && "cyber-border opacity-60 hover:opacity-100 bg-surface-dark",
        isActive && "active-phase bg-[#161b26]",
        isDone && "cyber-border bg-surface-dark"
      )}
    >
      {/* Admin Edit Controls */}
      {adminMode && (
        <button className="absolute top-2 right-2 p-1.5 rounded bg-black/40 text-slate-400 hover:text-white hover:bg-primary z-20 opacity-0 group-hover:opacity-100 transition-all">
            <Settings className="w-4 h-4" />
        </button>
      )}

      {/* Background Effects */}
      {isDone && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
      )}
      {isActive && (
        <div className="absolute top-0 left-0 w-full h-1 bg-primary shadow-[0_0_10px_#256af4]" />
      )}

      {/* Header */}
      <div className="flex justify-between items-start relative z-10">
        {isDone && (
          <>
            <span className="text-xs font-mono text-emerald-400 border border-emerald-500/30 bg-emerald-500/10 px-2 py-0.5 rounded">DONE</span>
            <CheckCircle2 className="text-emerald-500 w-6 h-6" />
          </>
        )}
        {isActive && (
          <>
            <span className="text-xs font-mono text-primary border border-primary/30 bg-primary/10 px-2 py-0.5 rounded animate-pulse">ACTIVE</span>
            <Loader2 className="text-primary w-6 h-6 animate-spin" />
          </>
        )}
        {isLocked && (
          <>
            <span className="text-xs font-mono text-slate-500 border border-slate-700 bg-slate-800 px-2 py-0.5 rounded">LOCKED</span>
            <Lock className="text-slate-600 w-6 h-6" />
          </>
        )}
      </div>

      {/* Content */}
      <div className="relative z-10">
        <p className={cn("text-xs font-mono mb-1", isActive ? "text-primary/80" : "text-slate-400")}>
          PHASE {index}
        </p>
        <h3 className={cn("font-bold text-lg leading-tight", isLocked ? "text-slate-300" : "text-white")}>
          {phase.title}
        </h3>
      </div>

      {/* Progress Bar */}
      <div className="relative z-10">
        {isActive && (
            <div className="flex justify-between text-xs text-primary/80 mb-2">
                <span>Progress</span>
                <span>{phase.progress}%</span>
            </div>
        )}
        <div className="w-full bg-[#282e39] h-1.5 rounded-full overflow-hidden">
          <div
            className={cn("h-full transition-all duration-500",
                isDone ? "bg-emerald-500 w-full" :
                isActive ? "bg-primary shadow-[0_0_8px_#256af4]" :
                "bg-slate-600 w-0"
            )}
            style={isActive ? { width: `${phase.progress}%` } : {}}
          />
        </div>
      </div>
    </motion.div>
  );
}
