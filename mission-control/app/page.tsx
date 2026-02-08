"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { PhaseCard } from "@/components/PhaseCard";
import { WeeklyBattlePlan } from "@/components/WeeklyBattlePlan";
import { BadDayModal } from "@/components/BadDayModal";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { Rocket, Terminal, Code2, FileCode2, Box, AlertTriangle } from "lucide-react";
import { motion } from "framer-motion";

export default function Dashboard() {
  const { phases, userStats, setBadDayProtocol, init } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    init(); // Hydrate from Supabase (or Mock)
  }, [init]);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Top Navigation */}
      <header className="sticky top-0 z-40 flex items-center justify-between whitespace-nowrap border-b border-solid border-b-[#282e39] bg-[#111318]/90 backdrop-blur-md px-6 py-3 lg:px-10">
        <div className="flex items-center gap-4 text-white">
          <div className="flex items-center justify-center size-10 rounded-lg bg-primary/20 text-primary">
            <Rocket className="w-6 h-6" />
          </div>
          <div>
            <h2 className="text-white text-lg font-bold leading-tight tracking-[-0.015em] uppercase">Operation Ironclad</h2>
            <p className="text-xs text-slate-400 font-mono tracking-widest">MISSION CONTROL // V.1.0.4</p>
          </div>
        </div>
        <div className="hidden md:flex flex-1 justify-end gap-8 items-center">

          {/* Gamification Stats */}
          <div className="flex items-center gap-6 mr-4">
             {/* XP */}
             <div className="flex flex-col items-end">
                <span className="text-[10px] font-mono text-primary uppercase tracking-wider">Level {userStats.level}</span>
                <div className="flex items-center gap-2">
                    <span className="text-sm font-bold text-white">{userStats.xp.toLocaleString()} XP</span>
                    <div className="w-24 h-1.5 bg-[#282e39] rounded-full overflow-hidden">
                        <div className="h-full bg-primary w-[70%]" />
                    </div>
                </div>
             </div>

             {/* Streak */}
             <div className="flex items-center gap-2 bg-orange-500/10 px-3 py-1.5 rounded-lg border border-orange-500/20">
                <span className="text-orange-500 font-bold text-sm">{userStats.streak}</span>
                <span className="text-[10px] text-orange-400 font-mono uppercase">Days</span>
                <div className="relative">
                    <div className="absolute inset-0 bg-orange-500 blur-sm opacity-50 animate-pulse" />
                    <svg className="w-4 h-4 text-orange-500 relative z-10 fill-current" viewBox="0 0 24 24">
                        <path d="M12 2C9.5 5 7 7.5 7 10.5C7 13.5 9.24 16 12 16C14.76 16 17 13.5 17 10.5C17 7.5 14.5 5 12 2ZM12 22C7.5 22 4 18.5 4 14C4 10 7 6 7 6C7 6 6 8.5 6 10C6 13 8 15 10 16C8 17 8 18 9 19C10.5 20.5 13 21 15 19C15 19 14 18 14 17C14 15 17 13 17 10C17 10 20 14 20 18C20 20.2 18.2 22 16 22H12Z"/>
                    </svg>
                </div>
             </div>
          </div>

          <div className="h-8 w-px bg-[#282e39]" />

          <nav className="flex items-center gap-1 bg-[#1b212d] p-1 rounded-lg border border-[#282e39]">
            <a className="text-white text-sm font-medium leading-normal px-4 py-2 rounded bg-primary/20 text-primary" href="#">Dashboard</a>
            <a className="text-[#9ca6ba] hover:text-white text-sm font-medium leading-normal px-4 py-2 rounded hover:bg-[#282e39] transition-colors" href="#">Missions</a>
            <a className="text-[#9ca6ba] hover:text-white text-sm font-medium leading-normal px-4 py-2 rounded hover:bg-[#282e39] transition-colors" href="#">Intel</a>
          </nav>
          <div className="h-8 w-px bg-[#282e39]" />
          <div className="bg-center bg-no-repeat bg-cover rounded-full size-10 ring-2 ring-[#282e39] relative" style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuDK3Fl6rpku752bP9qg0Pgukjno6vdKo0L3BKUzSurvqq4xvHuWaILElpiFCTPd8NBNEi2zv8QYePASWwm9-do6QYMKkPkU54P_ECruFtzO1djHyzmZd8dO0P4LKPqPv3XilJP6jf6Pqel0YXLiS6BkdBh8MiEjFOq7ZWcn4e2ZKyjhNcP1LIogvA4jJHDk6J5zZY6G5VBB5jbbODCYxpRQ7SdFr81ttPhoNGOHgqzO3l8nc14u5C3CHXTOqC1MpelKeABWnL6bmIM")' }}>
            <div className="absolute bottom-0 right-0 size-3 bg-emerald-500 rounded-full border-2 border-[#111318]" />
          </div>
        </div>
      </header>

      <main className="flex-1 flex flex-col items-center px-4 py-8 md:px-10 lg:px-40">
        <div className="w-full max-w-[1200px] flex flex-col gap-8">

          {/* Page Heading & Status */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#282e39] pb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                System Online
              </div>
              <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em]">PHASE 1: MOBILIZATION</h1>
              <p className="text-[#9ca6ba] text-base font-normal leading-normal max-w-xl">
                Current objective: Establish core competencies in low-level memory management and foundational algorithms.
              </p>
            </div>

            <div className="flex items-center gap-4 bg-[#1b212d] p-4 rounded-xl border border-[#282e39]">
              <div className="text-right">
                <p className="text-xs text-[#9ca6ba] uppercase tracking-wider">Overall Progress</p>
                <p className="text-2xl font-bold text-white">24%</p>
              </div>
              <div className="relative size-12">
                 <svg className="size-full -rotate-90" viewBox="0 0 36 36">
                    <path className="text-[#282e39]" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                    <path className="text-primary drop-shadow-[0_0_4px_rgba(37,106,244,0.5)]" strokeDasharray="24, 100" d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831" fill="none" stroke="currentColor" strokeWidth="4" />
                </svg>
              </div>
            </div>
          </div>

          {/* Phase Cards Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
            {phases.map((phase, i) => (
                <PhaseCard key={phase.id} phase={phase} index={i} />
            ))}
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Battle Plan Section */}
            <div className="lg:col-span-2">
                <WeeklyBattlePlan />
            </div>

            {/* Right Column: Stack & Protocols */}
            <div className="flex flex-col gap-8">
                {/* Tech Stack Section */}
                <div className="flex flex-col gap-4">
                    <h2 className="text-white text-xl font-bold leading-tight tracking-[-0.015em] flex items-center gap-3">
                        <Box className="text-primary w-6 h-6" />
                        ACTIVE LOADOUT
                    </h2>
                    <div className="grid grid-cols-2 gap-3">
                        <StackItem icon={<Terminal className="text-blue-400 w-8 h-8" />} title="C++" subtitle="Core Systems" />
                        <StackItem icon={<Code2 className="text-yellow-400 w-8 h-8" />} title="Python" subtitle="Scripting" />
                        <StackItem icon={<FileCode2 className="text-orange-400 w-8 h-8" />} title="Git" subtitle="Version Ctrl" />
                        <StackItem icon={<Box className="text-blue-300 w-8 h-8" />} title="Docker" subtitle="Containers" />
                    </div>
                </div>

                {/* Bad Day Protocol Trigger */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 relative overflow-hidden">
                    <div className="absolute -right-6 -top-6 text-red-500/10">
                        <AlertTriangle className="w-[120px] h-[120px]" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-red-400 font-bold text-lg">BAD DAY PROTOCOL</h3>
                                <p className="text-red-400/60 text-xs">Switch to low-intensity mode</p>
                            </div>
                            <div className="flex items-center">
                                <button
                                    onClick={() => setBadDayProtocol(true)}
                                    className="relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2 focus:ring-offset-[#111318] bg-slate-700 hover:bg-slate-600"
                                >
                                    <span className="sr-only">Use setting</span>
                                    <span aria-hidden="true" className="pointer-events-none inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out translate-x-0" />
                                </button>
                            </div>
                        </div>
                        <p className="text-slate-400 text-sm">
                            Reduces active tasks to critical items only. Extends deadlines by 24h. Activates soothing UI theme.
                        </p>
                    </div>
                </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-[#282e39] bg-[#111318] py-4 px-10 text-xs text-slate-500 font-mono uppercase tracking-wider flex justify-between">
        <div>System Integrity: 98%</div>
        <div className="flex gap-4">
          <span>Server: US-EAST-1</span>
          <span>Latency: 24ms</span>
        </div>
      </footer>

      {/* Global Modals */}
      <BadDayModal />
      <TaskDetailModal />
    </div>
  );
}

function StackItem({ icon, title, subtitle }: { icon: React.ReactNode, title: string, subtitle: string }) {
    return (
        <div className="bg-surface-dark border border-[#282e39] hover:border-primary/50 transition-colors p-4 rounded-xl flex flex-col items-center gap-3 group">
            <div className="size-12 rounded-full bg-[#282e39] flex items-center justify-center group-hover:bg-primary/10 transition-colors">
                {icon}
            </div>
            <div className="text-center">
                <p className="text-white font-bold text-sm">{title}</p>
                <p className="text-xs text-slate-500">{subtitle}</p>
            </div>
        </div>
    )
}
