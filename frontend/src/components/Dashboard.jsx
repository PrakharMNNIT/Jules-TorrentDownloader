import React, { useEffect } from 'react';
import { useTorrentStore } from '../store';
import { MagnetInput } from './MagnetInput';
import { TorrentCard } from './TorrentCard';
import { GlassPanel } from './GlassPanel';
import { Settings, Cpu } from 'lucide-react';

export function Dashboard() {
  const { torrents, globalStats, connectWebSocket, isConnected } = useTorrentStore();

  useEffect(() => {
    connectWebSocket();
  }, [connectWebSocket]);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className="flex flex-col h-full w-full relative z-10">
      {/* Header */}
      <header className="flex items-center justify-between px-10 py-8 w-full">
        <div className="flex items-center gap-4">
          <div className="text-primary">
             <span className="material-symbols-outlined text-[32px] fill-current">hub</span>
          </div>
          <h2 className="text-white text-xl font-bold tracking-[0.2em] uppercase">The Void</h2>
        </div>
        <div className="flex items-center gap-4">
           <div className="bg-white/5 border border-white/10 rounded-full px-4 py-1.5 flex items-center gap-2">
            <span className={`w-1.5 h-1.5 rounded-full shadow-[0_0_8px] ${isConnected ? 'bg-emerald-500 shadow-emerald-500/80' : 'bg-red-500 shadow-red-500/80'}`}></span>
            <span className="text-[11px] font-medium text-slate-400 uppercase tracking-widest">{isConnected ? 'Connected' : 'Offline'}</span>
          </div>
          <button className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-white bg-white/5 rounded-lg border border-white/5">
             <Settings size={20} />
          </button>
        </div>
      </header>

      <main className="flex flex-1 overflow-hidden px-10 pb-10 gap-10">
        {/* Left Stats Panel */}
        <div className="hidden xl:flex w-1/4 flex-col justify-end pb-32">
           <GlassPanel className="border-l-2 border-l-primary/50 max-w-[280px]">
              <div className="flex items-center gap-2 text-primary mb-3">
                 <Cpu size={18} />
                 <span className="text-[10px] font-bold tracking-[0.15em] uppercase">System Load</span>
              </div>
              <p className="text-3xl font-medium text-white mb-1">Optimal</p>
              <p className="text-xs text-slate-500">Engine Active • {torrents.length} Tasks</p>
           </GlassPanel>
        </div>

        {/* Center Dropzone / Main Area */}
        <div className="flex-1 flex flex-col items-center justify-center relative">
            <GlassPanel className="w-full max-w-3xl aspect-[16/10] rounded-[2rem] flex flex-col items-center justify-center p-16 relative">
                 <div className="text-primary mb-10">
                    <span className="material-symbols-outlined text-[88px] opacity-80">cloud_upload</span>
                 </div>
                 <h1 className="text-5xl font-bold text-white mb-3 tracking-tight text-center">Initialize Transfer</h1>
                 <p className="text-slate-500 text-lg mb-12 text-center font-light">Paste a magnet link to begin ingestion</p>

                 <MagnetInput />
            </GlassPanel>

             {/* Global Speed Stats */}
            <div className="absolute bottom-28 w-full flex justify-center pointer-events-none">
                <div className="glass-card px-10 py-5 rounded-full flex gap-16 pointer-events-auto border-white/10 shadow-2xl bg-[#0a0c14]/60">
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Down Speed</span>
                        <span className="text-2xl font-bold text-emerald-400 font-mono tracking-tight">{formatBytes(globalStats.download_rate)}/s</span>
                    </div>
                    <div className="w-px h-10 bg-white/5"></div>
                    <div className="flex flex-col items-center gap-1">
                        <span className="text-[9px] uppercase tracking-[0.2em] text-slate-500">Up Speed</span>
                        <span className="text-2xl font-bold text-primary font-mono tracking-tight">{formatBytes(globalStats.upload_rate)}/s</span>
                    </div>
                </div>
            </div>
        </div>

        {/* Right List Panel */}
        <div className="hidden lg:flex w-1/4 xl:w-1/5 flex-col gap-5 h-full pt-10 pb-32 overflow-y-auto custom-scrollbar">
            <h3 className="text-[10px] uppercase tracking-[0.25em] text-slate-500 mb-2 pl-2">Active Sequences</h3>
            {torrents.length === 0 && (
                <div className="text-slate-600 text-xs text-center py-10 italic">No active sequences</div>
            )}
            {torrents.map(torrent => (
                <TorrentCard key={torrent.id} torrent={torrent} />
            ))}
        </div>
      </main>

       {/* Ambient Background Elements */}
       <div className="ambient-glow bg-primary w-[600px] h-[600px] top-[-100px] left-[-100px]"></div>
       <div className="ambient-glow bg-blue-900 w-[700px] h-[700px] bottom-[-150px] right-[-150px]"></div>
    </div>
  );
}
