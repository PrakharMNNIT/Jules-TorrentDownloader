import React from 'react';
import { Play, Pause, Trash2, HardDriveDownload, HardDriveUpload } from 'lucide-react';
import { useTorrentStore } from '../store';
import { clsx } from 'clsx';

export function TorrentCard({ torrent }) {
  const performAction = useTorrentStore(state => state.performAction);

  const formatBytes = (bytes) => {
    if (bytes === 0) return '0 B';
    const k = 1024;
    const sizes = ['B', 'KB', 'MB', 'GB', 'TB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  const getStatusColor = (state) => {
    if (state.includes('downloading')) return 'text-emerald-400 bg-emerald-400/10';
    if (state.includes('seeding')) return 'text-purple-400 bg-purple-400/10';
    if (state.includes('paused')) return 'text-slate-500 bg-white/5';
    return 'text-primary bg-primary/10';
  };

  const getProgressBarColor = (state) => {
    if (state.includes('downloading')) return 'bg-primary shadow-[0_0_10px_rgba(37,106,244,0.4)]';
    if (state.includes('seeding')) return 'bg-purple-500 shadow-[0_0_10px_rgba(168,85,247,0.4)]';
    return 'bg-slate-700';
  };

  return (
    <div className="glass-card rounded-2xl p-5 flex gap-4 items-start group relative">
      {/* Icon Placeholder */}
      <div className="w-12 h-12 rounded-lg bg-white/5 border border-white/10 shrink-0 flex items-center justify-center">
         <span className="material-symbols-outlined text-2xl text-slate-500">grid_view</span>
      </div>

      <div className="flex flex-col flex-1 min-w-0">
        <div className="flex justify-between items-start mb-3">
          <p className="text-sm font-medium text-white truncate pr-2" title={torrent.name || "Loading..."}>
            {torrent.name || "Loading metadata..."}
          </p>
          <span className={clsx("text-[9px] font-bold px-2 py-0.5 rounded tracking-tighter uppercase", getStatusColor(torrent.state))}>
            {torrent.state.replace('_', ' ')}
          </span>
        </div>

        <div className="w-full bg-white/5 h-1 mb-2 rounded-full overflow-hidden">
          <div
            className={clsx("h-full transition-all duration-500", getProgressBarColor(torrent.state))}
            style={{ width: `${torrent.progress}%` }}
          ></div>
        </div>

        <div className="flex justify-between text-[10px] text-slate-500 font-mono">
           <span className="flex items-center gap-1"><HardDriveDownload size={10}/> {formatBytes(torrent.download_rate)}/s</span>
           <span className="flex items-center gap-1"><HardDriveUpload size={10}/> {formatBytes(torrent.upload_rate)}/s</span>
           <span>{torrent.progress.toFixed(1)}%</span>
        </div>
      </div>

      {/* Hover Controls */}
      <div className="absolute right-4 top-4 opacity-0 group-hover:opacity-100 transition-opacity flex gap-2">
        {torrent.is_paused ? (
            <button onClick={() => performAction(torrent.id, 'resume')} className="p-1.5 hover:bg-white/10 rounded-lg text-emerald-400">
                <Play size={16} />
            </button>
        ) : (
            <button onClick={() => performAction(torrent.id, 'pause')} className="p-1.5 hover:bg-white/10 rounded-lg text-amber-400">
                <Pause size={16} />
            </button>
        )}
        <button onClick={() => performAction(torrent.id, 'delete')} className="p-1.5 hover:bg-white/10 rounded-lg text-red-400">
            <Trash2 size={16} />
        </button>
      </div>
    </div>
  );
}
