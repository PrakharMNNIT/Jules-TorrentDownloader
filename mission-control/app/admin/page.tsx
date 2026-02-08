"use client";

import { useEffect, useState } from "react";
import { useStore } from "@/lib/store";
import { PhaseCard } from "@/components/PhaseCard";
import { WeeklyBattlePlan } from "@/components/WeeklyBattlePlan";
import { BadDayModal } from "@/components/BadDayModal";
import { TaskDetailModal } from "@/components/TaskDetailModal";
import { TopNav } from "@/components/layout/TopNav";
import { ActiveLoadout } from "@/components/sections/ActiveLoadout";
import { AlertTriangle, Plus, Calendar, Flag } from "lucide-react";
import { motion } from "framer-motion";

export default function AdminDashboard() {
  const { phases, setBadDayProtocol, init, setAdminMode } = useStore();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setAdminMode(true);
    init(); // Hydrate from Supabase (or Mock)
  }, [init, setAdminMode]);

  if (!mounted) return null;

  return (
    <div className="relative flex min-h-screen w-full flex-col">
      {/* Top Navigation */}
      <TopNav />

      <main className="flex-1 flex flex-col items-center px-4 py-8 md:px-10 lg:px-40 relative">

        {/* Admin Floating Actions (Screen 3) */}
        <div className="fixed right-8 bottom-8 z-40 group">
            <div className="absolute bottom-full right-0 mb-4 flex flex-col gap-2 opacity-0 translate-y-4 group-hover:opacity-100 group-hover:translate-y-0 transition-all pointer-events-none group-hover:pointer-events-auto">
                <button className="flex items-center gap-3 bg-[#1b212d] border border-[#282e39] text-slate-300 hover:text-white hover:border-primary p-2 pr-4 rounded-full shadow-lg">
                    <div className="size-8 rounded-full bg-[#282e39] flex items-center justify-center">
                        <Calendar className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono uppercase">Change Week</span>
                </button>
                <button className="flex items-center gap-3 bg-[#1b212d] border border-[#282e39] text-slate-300 hover:text-white hover:border-primary p-2 pr-4 rounded-full shadow-lg">
                    <div className="size-8 rounded-full bg-[#282e39] flex items-center justify-center">
                        <Flag className="w-4 h-4" />
                    </div>
                    <span className="text-xs font-mono uppercase">End Phase</span>
                </button>
            </div>
            <button className="size-14 rounded-full bg-primary text-white shadow-[0_0_20px_rgba(37,106,244,0.4)] hover:shadow-[0_0_30px_rgba(37,106,244,0.6)] hover:scale-105 transition-all flex items-center justify-center">
                <Plus className="w-8 h-8" />
            </button>
        </div>

        <div className="w-full max-w-[1200px] flex flex-col gap-8">

          {/* Page Heading & Status */}
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 border-b border-[#282e39] pb-6">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 text-primary text-sm font-bold tracking-widest uppercase">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                    </span>
                    System Online
                  </div>
                  <div className="flex items-center gap-1 text-xs text-orange-400 border border-orange-400/30 bg-orange-400/10 px-2 py-0.5 rounded">
                    <span className="material-symbols-outlined text-[14px]">admin_panel_settings</span>
                    EDITING
                   </div>
              </div>

              <div className="group relative inline-block max-w-fit">
                <h1 className="text-white text-4xl md:text-5xl font-black leading-tight tracking-[-0.033em] border-b-2 border-dashed border-slate-600 pb-1 hover:border-primary cursor-text transition-colors">PHASE 1: MOBILIZATION</h1>
              </div>

              <div className="group relative max-w-xl">
                 <p className="text-[#9ca6ba] text-base font-normal leading-normal border border-transparent hover:border-dashed hover:border-slate-600 p-1 -ml-1 rounded cursor-text transition-colors">
                    Current objective: Establish core competencies in low-level memory management and foundational algorithms.
                 </p>
              </div>
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
                <ActiveLoadout />

                {/* Bad Day Protocol Trigger */}
                <div className="bg-red-500/5 border border-red-500/20 rounded-xl p-5 relative overflow-hidden group">
                    <div className="absolute -right-6 -top-6 text-red-500/10">
                        <AlertTriangle className="w-[120px] h-[120px]" />
                    </div>
                    <div className="relative z-10 flex flex-col gap-4">
                        <div className="flex justify-between items-start">
                            <div>
                                <h3 className="text-red-400 font-bold text-lg cursor-text hover:underline decoration-dashed">BAD DAY PROTOCOL</h3>
                                <p className="text-red-400/60 text-xs cursor-text">Switch to low-intensity mode</p>
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
                        <p className="text-slate-400 text-sm border border-transparent hover:border-dashed hover:border-red-500/30 p-1 -m-1 rounded cursor-text">
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
