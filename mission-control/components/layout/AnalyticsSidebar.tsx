"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Shield,
  LayoutDashboard,
  BarChart2,
  GraduationCap,
  CheckCircle2,
  Circle,
  LogOut,
  Settings,
  Bell
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useStore } from "@/lib/store";

export function AnalyticsSidebar() {
  const pathname = usePathname();
  const { userStats } = useStore();

  return (
    <aside className="w-72 border-r border-[#282e39] bg-[#111318] flex flex-col h-full shrink-0 z-20 overflow-hidden">
      {/* Header */}
      <div className="p-6 border-b border-[#282e39] flex items-center gap-3">
        <div className="size-8 rounded bg-primary flex items-center justify-center text-white shadow-[0_0_15px_rgba(37,106,244,0.4)]">
          <Shield className="w-5 h-5" />
        </div>
        <div>
          <h2 className="text-white text-lg font-bold leading-tight tracking-wider uppercase">Ironclad</h2>
          <p className="text-[#9ca6ba] text-xs font-normal">Mission Control</p>
        </div>
      </div>

      <div className="flex flex-col gap-6 p-4 overflow-y-auto flex-1">
        {/* User Profile */}
        <div className="flex items-center gap-3 p-3 rounded-lg bg-[#1a1e26] border border-[#282e39]">
          <div
            className="size-10 rounded-full bg-cover bg-center border border-[#3b4354]"
            style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDK3Fl6rpku752bP9qg0Pgukjno6vdKo0L3BKUzSurvqq4xvHuWaILElpiFCTPd8NBNEi2zv8QYePASWwm9-do6QYMKkPkU54P_ECruFtzO1djHyzmZd8dO0P4LKPqPv3XilJP6jf6Pqel0YXLiS6BkdBh8MiEjFOq7ZWcn4e2ZKyjhNcP1LIogvA4jJHDk6J5zZY6G5VBB5jbbODCYxpRQ7SdFr81ttPhoNGOHgqzO3l8nc14u5C3CHXTOqC1MpelKeABWnL6bmIM")' }}
          />
          <div>
            <h3 className="text-sm font-bold text-white">Commander</h3>
            <p className="text-xs text-primary font-medium">Level {userStats.level} // Elite</p>
          </div>
        </div>

        {/* Navigation Sections */}
        <div className="flex flex-col gap-2">
          <p className="text-[#58627a] text-xs font-bold uppercase tracking-widest px-3 mb-1">Navigation</p>

          <Link
            href="/"
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded transition-colors",
                pathname === "/" ? "bg-primary/10 text-primary border border-primary/20" : "text-[#9ca6ba] hover:text-white hover:bg-[#1f242e]"
            )}
          >
            <LayoutDashboard className="w-5 h-5" />
            <span className="text-sm font-medium">Dashboard</span>
          </Link>

          <Link
            href="/analytics"
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded transition-colors",
                pathname === "/analytics" ? "bg-primary/10 text-primary border border-primary/20" : "text-[#9ca6ba] hover:text-white hover:bg-[#1f242e]"
            )}
          >
            <BarChart2 className="w-5 h-5" />
            <span className="text-sm font-medium">History & Trends</span>
          </Link>

          <Link
            href="/log"
            className={cn(
                "flex items-center gap-3 px-3 py-2 rounded transition-colors",
                pathname === "/log" ? "bg-primary/10 text-primary border border-primary/20" : "text-[#9ca6ba] hover:text-white hover:bg-[#1f242e]"
            )}
          >
            <GraduationCap className="w-5 h-5" />
            <span className="text-sm font-medium">Curriculum</span>
          </Link>
        </div>

        {/* Filters Simulation */}
        <div className="flex flex-col gap-2">
          <p className="text-[#58627a] text-xs font-bold uppercase tracking-widest px-3 mb-1">Phase Filter</p>
          {['Recruitment', 'Training', 'Deployment'].map((phase, i) => (
             <label key={phase} className="flex items-center gap-3 px-3 py-2 cursor-pointer group">
                <div className={cn(
                    "relative flex items-center justify-center size-5 rounded border transition-colors",
                    i < 2 ? "border-primary bg-[#1a1e26]" : "border-[#3b4354] bg-[#1a1e26] group-hover:border-primary"
                )}>
                  {i < 2 && <CheckCircle2 className="w-3 h-3 text-primary" />}
                </div>
                <span className={cn(
                    "text-sm font-medium transition-colors",
                    i < 2 ? "text-white" : "text-[#9ca6ba] group-hover:text-white"
                )}>
                    Phase {i+1}: {phase}
                </span>
             </label>
          ))}
        </div>

        {/* Metric Toggles Simulation */}
        <div className="flex flex-col gap-2">
           <p className="text-[#58627a] text-xs font-bold uppercase tracking-widest px-3 mb-1">Data Layers</p>
           {['Bio-Vitals', 'Deep Work'].map(layer => (
               <div key={layer} className="flex items-center justify-between px-3 py-2">
                   <span className="text-sm text-[#9ca6ba]">{layer}</span>
                   <div className="w-8 h-4 rounded-full bg-primary/20 relative cursor-pointer">
                        <div className="absolute right-0.5 top-0.5 size-3 rounded-full bg-primary shadow-sm" />
                   </div>
               </div>
           ))}
        </div>
      </div>

      <div className="mt-auto p-4 border-t border-[#282e39]">
        <button className="flex items-center gap-2 text-[#9ca6ba] hover:text-white transition-colors text-sm font-medium w-full">
            <LogOut className="w-5 h-5" />
            <span>Abort Mission</span>
        </button>
      </div>
    </aside>
  );
}
