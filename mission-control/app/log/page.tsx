"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useStore } from "@/lib/store";
import { X, Activity, Timer, Code, HeartPulse, Cpu, UploadCloud } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export default function MissionLog() {
  const router = useRouter();
  const { userStats, updateBio, addXP } = useStore();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [deepWorkHours, setDeepWorkHours] = useState(32);
  const [leetcodeProblems, setLeetcodeProblems] = useState(12);

  // Local state for bio metrics to allow smooth sliding before commit
  const [localBio, setLocalBio] = useState(userStats.bio);

  const handleBioChange = (metric: keyof typeof localBio, value: number) => {
    setLocalBio(prev => ({ ...prev, [metric]: value }));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 800));

    // Update store
    await updateBio('mood', localBio.mood);
    await updateBio('energy', localBio.energy);
    await updateBio('confidence', localBio.confidence);
    await addXP(50); // XP reward for logging

    setIsSubmitting(false);
    router.push('/');
  };

  return (
    <div className="bg-[#111318] text-white font-display min-h-screen flex flex-col relative overflow-x-hidden selection:bg-primary selection:text-white">
      {/* Ambient Background Effects */}
      <div className="fixed inset-0 pointer-events-none z-0">
        <div className="absolute inset-0 opacity-50 bg-[url('/hex-pattern.svg')]" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-primary/10 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[500px] h-[500px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Main Content Wrapper */}
      <div className="relative z-10 flex-1 flex flex-col items-center justify-center p-4 md:p-8 lg:p-12">
        {/* HUD Container */}
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-panel w-full max-w-[1000px] rounded-xl overflow-hidden shadow-2xl shadow-black/50 flex flex-col border border-[#282e39]/80 bg-[#1a1d26]/70 backdrop-blur-xl"
        >
          {/* Header Section */}
          <div className="border-b border-[#282e39] p-6 md:p-8 flex flex-col md:flex-row justify-between items-start md:items-center gap-4 bg-[#1b212d]/50">
            <div className="flex flex-col gap-1">
              <div className="flex items-center gap-2 text-primary text-xs font-bold tracking-[0.2em] uppercase">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-primary" />
                </span>
                System Online
              </div>
              <h1 className="text-3xl md:text-4xl font-black tracking-tighter text-white">MISSION LOG: WEEK 42</h1>
              <p className="text-gray-400 text-sm font-medium tracking-wide">OPERATION IRONCLAD // CLASSIFIED EYES ONLY</p>
            </div>
            <div className="flex items-center gap-4">
              <div
                className="bg-center bg-no-repeat bg-cover rounded-full size-12 border-2 border-primary/30 shadow-[0_0_15px_rgba(37,106,244,0.3)]"
                style={{ backgroundImage: 'url("https://lh3.googleusercontent.com/aida-public/AB6AXuBRW8T7YJ8H065V5SsfPb4eYbSvPhlVJ4YLr8OKz4rLzvFqXiUH5Ad_Wa6vzeMeqQ0Lp7LNfocZ4n9xzBHtQnif3l8j-_j4CLfFKVWiSsPyIuuAPPMSG7WGSY1s_nvsmPJYbJ2Tr5btH8uo8PFxQPwQWSwZ9_dwJh_lyHZ6YwhOA2SNEux9IaqeQK2x2xmvZubuDufaNXmBo88F667EcB0sKMm57uKYV-s_JF18K4D6Mad9KfEGghto_XfRmJAK3E8SrchZJrxJL-Y")' }}
              />
              <div className="hidden md:flex flex-col items-end">
                <span className="text-white font-bold text-sm">CMD. SHEPARD</span>
                <span className="text-primary text-xs">LEVEL {userStats.level} OPERATIVE</span>
              </div>
              <button
                onClick={() => router.push('/')}
                className="flex items-center justify-center w-10 h-10 rounded-lg bg-[#282e39]/50 hover:bg-[#282e39] text-gray-400 hover:text-white transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Scrollable Content Area */}
          <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-8">

            {/* Section 1: Operational Metrics */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Activity className="w-5 h-5" />
                <h2 className="text-sm font-bold tracking-[0.1em] uppercase">Operational Metrics</h2>
                <div className="h-px bg-[#282e39] flex-1 ml-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Left: Checklists */}
                <div className="rounded-lg p-5 bg-[#111318]/50 border border-[#282e39]">
                  <h3 className="text-gray-400 text-xs uppercase font-bold mb-4 tracking-wider">Protocol Compliance</h3>
                  <div className="flex flex-col gap-3">
                    <label className="flex items-start gap-3 group cursor-pointer">
                      <div className="relative flex items-center">
                        <input className="peer h-5 w-5 rounded border-2 border-gray-600 bg-[#111318] text-primary focus:ring-0 focus:ring-offset-0 focus:border-primary transition-all checked:bg-primary checked:border-primary" type="checkbox" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">Mon-Thu Schedule Adherence</span>
                        <span className="text-gray-500 text-xs">Zero deviations allowed</span>
                      </div>
                    </label>
                    <label className="flex items-start gap-3 group cursor-pointer">
                      <div className="relative flex items-center">
                        <input className="peer h-5 w-5 rounded border-2 border-gray-600 bg-[#111318] text-primary focus:ring-0 focus:ring-offset-0 focus:border-primary transition-all checked:bg-primary checked:border-primary" type="checkbox" />
                      </div>
                      <div className="flex flex-col">
                        <span className="text-white text-sm font-medium group-hover:text-primary transition-colors">Sleep Hygiene Protocol</span>
                        <span className="text-gray-500 text-xs">Target: 8 hours regeneration</span>
                      </div>
                    </label>
                  </div>
                </div>

                {/* Right: Counters */}
                <div className="rounded-lg p-5 bg-[#111318]/50 border border-[#282e39]">
                  <h3 className="text-gray-400 text-xs uppercase font-bold mb-4 tracking-wider">Output Quantities</h3>
                  <div className="flex flex-col gap-4">
                    {/* Counter 1 */}
                    <div className="flex items-center justify-between p-3 rounded bg-[#1a1d26] border border-[#282e39]">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded text-primary">
                          <Timer className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-white">Deep Work Hours</span>
                      </div>
                      <div className="flex items-center gap-3 bg-[#111318] rounded px-2 py-1 border border-[#282e39]">
                        <button onClick={() => setDeepWorkHours(Math.max(0, deepWorkHours - 1))} className="text-gray-400 hover:text-white w-6 h-6 flex items-center justify-center text-lg">-</button>
                        <span className="w-8 text-center text-white font-mono text-sm">{deepWorkHours}</span>
                        <button onClick={() => setDeepWorkHours(deepWorkHours + 1)} className="text-gray-400 hover:text-white w-6 h-6 flex items-center justify-center text-lg">+</button>
                      </div>
                    </div>
                    {/* Counter 2 */}
                    <div className="flex items-center justify-between p-3 rounded bg-[#1a1d26] border border-[#282e39]">
                      <div className="flex items-center gap-3">
                        <div className="bg-primary/10 p-2 rounded text-primary">
                          <Code className="w-5 h-5" />
                        </div>
                        <span className="text-sm font-medium text-white">LeetCode Problems</span>
                      </div>
                      <div className="flex items-center gap-3 bg-[#111318] rounded px-2 py-1 border border-[#282e39]">
                        <button onClick={() => setLeetcodeProblems(Math.max(0, leetcodeProblems - 1))} className="text-gray-400 hover:text-white w-6 h-6 flex items-center justify-center text-lg">-</button>
                        <span className="w-8 text-center text-white font-mono text-sm">{leetcodeProblems}</span>
                        <button onClick={() => setLeetcodeProblems(leetcodeProblems + 1)} className="text-gray-400 hover:text-white w-6 h-6 flex items-center justify-center text-lg">+</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 2: Pilot Vitals */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <HeartPulse className="w-5 h-5" />
                <h2 className="text-sm font-bold tracking-[0.1em] uppercase">Pilot Vitals</h2>
                <div className="h-px bg-[#282e39] flex-1 ml-2" />
              </div>
              <div className="rounded-lg p-6 bg-[#111318]/50 border border-[#282e39] grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Slider 1 */}
                <div className="flex flex-col gap-3 group">
                  <div className="flex justify-between items-end">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wider">Mood</label>
                    <span className="text-primary font-mono text-lg font-bold">{localBio.mood}%</span>
                  </div>
                  <input
                    className="w-full accent-primary h-1 bg-[#282e39] rounded-lg appearance-none cursor-pointer range-sm"
                    max="100" min="1" type="range"
                    value={localBio.mood}
                    onChange={(e) => handleBioChange('mood', parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                    <span>CRITICAL</span>
                    <span>OPTIMAL</span>
                  </div>
                </div>
                {/* Slider 2 */}
                <div className="flex flex-col gap-3 group">
                  <div className="flex justify-between items-end">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wider">Energy</label>
                    <span className="text-primary font-mono text-lg font-bold">{localBio.energy}%</span>
                  </div>
                  <input
                    className="w-full accent-primary h-1 bg-[#282e39] rounded-lg appearance-none cursor-pointer range-sm"
                    max="100" min="1" type="range"
                    value={localBio.energy}
                    onChange={(e) => handleBioChange('energy', parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                    <span>LOW</span>
                    <span>HIGH</span>
                  </div>
                </div>
                {/* Slider 3 */}
                <div className="flex flex-col gap-3 group">
                  <div className="flex justify-between items-end">
                    <label className="text-gray-400 text-xs font-bold uppercase tracking-wider">Confidence</label>
                    <span className="text-primary font-mono text-lg font-bold">{localBio.confidence}%</span>
                  </div>
                  <input
                    className="w-full accent-primary h-1 bg-[#282e39] rounded-lg appearance-none cursor-pointer range-sm"
                    max="100" min="1" type="range"
                    value={localBio.confidence}
                    onChange={(e) => handleBioChange('confidence', parseInt(e.target.value))}
                  />
                  <div className="flex justify-between text-[10px] text-gray-600 font-mono">
                    <span>DOUBT</span>
                    <span>CERTAINTY</span>
                  </div>
                </div>
              </div>
            </section>

            {/* Section 3: Reflections */}
            <section>
              <div className="flex items-center gap-2 mb-4 text-primary">
                <Cpu className="w-5 h-5" />
                <h2 className="text-sm font-bold tracking-[0.1em] uppercase">Black Box Data</h2>
                <div className="h-px bg-[#282e39] flex-1 ml-2" />
              </div>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {/* Box 1 */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-green-500 rounded-full" />
                    Mission Wins
                  </label>
                  <textarea className="bg-[#111318]/80 border border-[#282e39] rounded-lg p-3 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none h-32 placeholder-gray-700 font-mono" placeholder="// INPUT SUCCESSFUL MANEUVERS..." />
                </div>
                {/* Box 2 */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                    Tactical Struggles
                  </label>
                  <textarea className="bg-[#111318]/80 border border-[#282e39] rounded-lg p-3 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none h-32 placeholder-gray-700 font-mono" placeholder="// INPUT SYSTEM FAILURES..." />
                </div>
                {/* Box 3 */}
                <div className="flex flex-col gap-2">
                  <label className="text-gray-400 text-xs font-bold uppercase tracking-wider flex items-center gap-2">
                    <span className="w-1.5 h-1.5 bg-blue-500 rounded-full" />
                    Technical Learnings
                  </label>
                  <textarea className="bg-[#111318]/80 border border-[#282e39] rounded-lg p-3 text-sm text-white focus:border-primary focus:ring-1 focus:ring-primary focus:outline-none resize-none h-32 placeholder-gray-700 font-mono" placeholder="// UPLOAD NEW DATA..." />
                </div>
              </div>
            </section>
          </div>

          {/* Footer Action */}
          <div className="p-6 md:p-8 bg-[#1a1d26]/80 border-t border-[#282e39] flex flex-col md:flex-row justify-between items-center gap-4 backdrop-blur-md">
            <div className="hidden md:flex flex-col">
              <span className="text-xs text-gray-500 uppercase tracking-wider">Estimated Upload Time</span>
              <span className="text-sm text-white font-mono">0.45s</span>
            </div>
            <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="w-full md:w-auto flex-1 md:flex-none md:min-w-[300px] h-14 bg-primary hover:bg-blue-600 text-white font-bold tracking-widest uppercase rounded flex items-center justify-center gap-3 shadow-[0_0_20px_rgba(37,106,244,0.4)] hover:shadow-[0_0_30px_rgba(37,106,244,0.6)] transition-all duration-300 group disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                  <UploadCloud className="w-5 h-5 animate-bounce" />
              ) : (
                  <UploadCloud className="w-5 h-5 group-hover:animate-pulse" />
              )}
              {isSubmitting ? 'UPLOADING...' : 'Log Mission Data'}
            </button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
