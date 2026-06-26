"use client";

import { useStore } from "@/lib/store";
import { AnalyticsSidebar } from "@/components/layout/AnalyticsSidebar";
import {
  Code2,
  Flame,
  Cpu,
  Target,
  Activity,
  Grid3X3,
  Bell,
  Settings,
  TrendingUp
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function AnalyticsPage() {
  const { userStats } = useStore();

  return (
    <div className="bg-[#101622] text-white font-display overflow-hidden h-screen flex">
      {/* Side Navigation */}
      <AnalyticsSidebar />

      {/* Main Content */}
      <main className="flex-1 flex flex-col relative overflow-hidden bg-[url('https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=2072&auto=format&fit=crop')] bg-cover bg-center">
        {/* Overlay for readability */}
        <div className="absolute inset-0 bg-[#101622]/95 pointer-events-none z-0" />

        {/* Header */}
        <header className="relative z-10 flex items-center justify-between px-8 py-5 border-b border-[#282e39]/50 backdrop-blur-sm">
          {/* Breadcrumbs */}
          <div className="flex flex-col gap-1">
            <nav className="flex items-center gap-2 text-xs font-medium uppercase tracking-wider text-[#9ca6ba]">
              <span className="hover:text-primary transition-colors cursor-pointer">Mission Control</span>
              <span className="text-[#3b4354]">/</span>
              <span className="text-white">Statistics</span>
            </nav>
            <h1 className="text-2xl font-bold text-white tracking-tight">MISSION ARCHIVES <span className="text-primary">//</span> TREND ANALYSIS</h1>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-4">
            <button className="size-10 flex items-center justify-center rounded-full bg-[#1a1e26] border border-[#282e39] text-[#9ca6ba] hover:text-white hover:border-primary/50 transition-colors">
              <Bell className="w-5 h-5" />
            </button>
            <button className="size-10 flex items-center justify-center rounded-full bg-[#1a1e26] border border-[#282e39] text-[#9ca6ba] hover:text-white hover:border-primary/50 transition-colors">
              <Settings className="w-5 h-5" />
            </button>
          </div>
        </header>

        {/* Dashboard Content */}
        <div className="relative z-10 flex-1 overflow-y-auto p-8">
          <div className="max-w-7xl mx-auto flex flex-col gap-6">

            {/* KPI Nodes */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <KPICard
                title="Total XP"
                value={userStats.xp.toLocaleString()}
                trend="+15%"
                icon={<Code2 className="w-8 h-8 text-primary" />}
                color="primary"
              />
              <KPICard
                title="Current Streak"
                value={`${userStats.streak} Days`}
                trend="+2 Days"
                icon={<Flame className="w-8 h-8 text-purple-500" />}
                color="purple"
              />
              <KPICard
                title="System Health"
                value="98%"
                sub="Optimal"
                icon={<Cpu className="w-8 h-8 text-cyan-400" />}
                color="cyan"
              />
              <KPICard
                title="Focus Score"
                value="8.5/10"
                trendIcon={<TrendingUp className="w-4 h-4" />}
                icon={<Target className="w-8 h-8 text-yellow-400" />}
                color="yellow"
              />
            </div>

            {/* Main Chart Section */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[400px]">

              {/* Neural Growth Chart */}
              <div className="lg:col-span-2 glass-panel rounded-lg p-6 flex flex-col relative border border-[#282e39] bg-[#1a1e26]/50 backdrop-blur-sm">
                <div className="flex justify-between items-start mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-white flex items-center gap-2">
                      <TrendingUp className="text-primary w-5 h-5" />
                      NEURAL GROWTH MONITOR
                    </h3>
                    <p className="text-[#9ca6ba] text-xs uppercase tracking-wider">LeetCode Problems Solved</p>
                  </div>
                  <div className="flex gap-2">
                    <button className="px-3 py-1 text-xs font-medium text-white bg-primary/20 border border-primary/40 rounded hover:bg-primary/30 transition">1W</button>
                    <button className="px-3 py-1 text-xs font-medium text-[#9ca6ba] bg-[#1a1e26] border border-[#3b4354] rounded hover:text-white transition">1M</button>
                    <button className="px-3 py-1 text-xs font-medium text-[#9ca6ba] bg-[#1a1e26] border border-[#3b4354] rounded hover:text-white transition">3M</button>
                  </div>
                </div>

                <div className="flex-1 w-full relative chart-grid border-l border-b border-[#3b4354] overflow-hidden">
                    {/* SVG Chart */}
                    <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" preserveAspectRatio="none">
                        <defs>
                            <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
                                <feGaussianBlur stdDeviation="4" result="blur" />
                                <feComposite in="SourceGraphic" in2="blur" operator="over" />
                            </filter>
                            <linearGradient id="fillGradient" x1="0" x2="0" y1="0" y2="1">
                                <stop offset="0%" stopColor="#256af4" stopOpacity="0.3" />
                                <stop offset="100%" stopColor="#256af4" stopOpacity="0" />
                            </linearGradient>
                        </defs>
                        <path className="w-full h-full" d="M0,250 L50,220 L150,230 L250,150 L350,180 L450,100 L550,120 L650,40 L750,60 L800,250 Z" fill="url(#fillGradient)" vectorEffect="non-scaling-stroke" />
                        <polyline fill="none" filter="url(#glow)" points="0,250 50,220 150,230 250,150 350,180 450,100 550,120 650,40 750,60" stroke="#256af4" strokeWidth="3" vectorEffect="non-scaling-stroke" />
                        <circle cx="250" cy="150" r="4" fill="#101622" stroke="#256af4" strokeWidth="2" />
                        <circle cx="450" cy="100" r="4" fill="#101622" stroke="#256af4" strokeWidth="2" />
                        <circle cx="650" cy="40" r="6" fill="#fff" stroke="#256af4" strokeWidth="2">
                            <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite" />
                        </circle>
                    </svg>

                    {/* Tooltip Simulation */}
                    <div className="absolute top-[30px] left-[650px] transform -translate-x-1/2 bg-[#1a1e26]/90 backdrop-blur border border-primary/30 p-2 rounded shadow-xl pointer-events-none">
                        <p className="text-[10px] text-[#9ca6ba] uppercase">Current Node</p>
                        <p className="text-sm font-bold text-white">45 Solved</p>
                    </div>
                </div>
              </div>

              {/* Heatmap / Chronosphere */}
              <div className="glass-panel rounded-lg p-6 flex flex-col border border-[#282e39] bg-[#1a1e26]/50 backdrop-blur-sm">
                <h3 className="text-lg font-bold text-white mb-1 flex items-center gap-2">
                    <Grid3X3 className="text-purple-400 w-5 h-5" />
                    DEEP WORK
                </h3>
                <p className="text-[#9ca6ba] text-xs uppercase tracking-wider mb-4">Daily Intensity Heatmap</p>

                <div className="flex-1 flex flex-col gap-2">
                    <div className="flex-1 grid grid-cols-12 gap-1.5 content-start">
                        {Array.from({ length: 84 }).map((_, i) => {
                            const opacity = Math.random();
                            let bgClass = "bg-[#282e39]";
                            if (opacity > 0.8) bgClass = "bg-primary/90 shadow-[0_0_8px_rgba(37,106,244,0.6)]";
                            else if (opacity > 0.6) bgClass = "bg-primary/60";
                            else if (opacity > 0.4) bgClass = "bg-primary/40";
                            else if (opacity > 0.2) bgClass = "bg-primary/20";

                            return (
                                <motion.div
                                    key={i}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    transition={{ delay: i * 0.005 }}
                                    className={`aspect-square rounded-sm ${bgClass}`}
                                />
                            )
                        })}
                    </div>
                    <div className="flex items-center justify-between text-xs text-[#58627a] mt-2">
                        <span>Less</span>
                        <div className="flex gap-1">
                            <div className="size-3 rounded-sm bg-[#282e39]" />
                            <div className="size-3 rounded-sm bg-primary/40" />
                            <div className="size-3 rounded-sm bg-primary/80" />
                            <div className="size-3 rounded-sm bg-primary" />
                        </div>
                        <span>More</span>
                    </div>
                </div>
              </div>
            </div>

            {/* Secondary Chart: Vitals Trend */}
            <div className="glass-panel rounded-lg p-6 flex flex-col h-[300px] border border-[#282e39] bg-[#1a1e26]/50 backdrop-blur-sm">
                <div className="flex justify-between items-center mb-4">
                    <div>
                        <h3 className="text-lg font-bold text-white flex items-center gap-2">
                            <Activity className="text-green-400 w-5 h-5" />
                            VITALS TELEMETRY
                        </h3>
                        <p className="text-[#9ca6ba] text-xs uppercase tracking-wider">Averaged Biometrics (Mood, Energy, Confidence)</p>
                    </div>
                    <div className="flex items-center gap-4 text-xs font-medium">
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-green-400" />
                            <span className="text-[#9ca6ba]">Mood</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-yellow-400" />
                            <span className="text-[#9ca6ba]">Energy</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="size-2 rounded-full bg-purple-400" />
                            <span className="text-[#9ca6ba]">Confidence</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 w-full relative chart-grid border-l border-b border-[#3b4354] rounded-bl-sm overflow-hidden">
                     <svg className="absolute inset-0 w-full h-full p-2 overflow-visible" preserveAspectRatio="none">
                        {/* Mood (Green) */}
                        <polyline fill="none" points="0,50 100,60 200,40 300,80 400,50 500,40 600,60 700,30 800,45" stroke="#4ade80" strokeOpacity="0.8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        {/* Energy (Yellow) */}
                        <polyline fill="none" points="0,80 100,90 200,70 300,60 400,85 500,80 600,90 700,70 800,75" stroke="#facc15" strokeOpacity="0.8" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                        {/* Confidence (Purple) */}
                        <polyline fill="none" points="0,100 100,110 200,100 300,90 400,60 500,50 600,30 700,20 800,10" stroke="#c084fc" strokeDasharray="4,4" strokeWidth="2" vectorEffect="non-scaling-stroke" />
                    </svg>
                    <div className="absolute -bottom-6 inset-x-0 flex justify-between text-xs text-[#58627a]">
                        <span>Week 1</span>
                        <span>Week 2</span>
                        <span>Week 3</span>
                        <span>Week 4</span>
                        <span>Week 5</span>
                        <span>Week 6</span>
                        <span>Week 7</span>
                        <span>Current</span>
                    </div>
                </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}

function KPICard({ title, value, trend, trendIcon, sub, icon, color }: any) {
    const borderColor = {
        primary: "border-l-primary",
        purple: "border-l-purple-500",
        cyan: "border-l-cyan-400",
        yellow: "border-l-yellow-400",
    }[color as string] || "border-l-primary";

    return (
        <div className={cn(
            "p-5 rounded-lg border-l-4 relative overflow-hidden group border border-[#282e39] bg-[#1a1e26]/50 backdrop-blur-sm",
            borderColor
        )}>
            <div className="absolute top-0 right-0 p-2 opacity-10 group-hover:opacity-20 transition-opacity">
                {icon}
            </div>
            <p className="text-[#9ca6ba] text-xs font-bold uppercase tracking-widest mb-1">{title}</p>
            <div className="flex items-end gap-2">
                <h3 className="text-3xl font-bold text-white neon-text">{value}</h3>
                {(trend || trendIcon) && (
                    <span className="text-[#0bda5e] text-sm font-medium mb-1 flex items-center gap-1">
                        {trendIcon || <TrendingUp className="w-4 h-4" />}
                        {trend}
                    </span>
                )}
                {sub && (
                    <span className="text-[#9ca6ba] text-sm font-medium mb-1">
                        {sub}
                    </span>
                )}
            </div>
        </div>
    )
}
