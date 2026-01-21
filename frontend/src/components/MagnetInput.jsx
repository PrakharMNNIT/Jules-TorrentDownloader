import React, { useState } from 'react';
import { useTorrentStore } from '../store';
import { ArrowRight, Link } from 'lucide-react';

export function MagnetInput() {
  const [link, setLink] = useState('');
  const addMagnet = useTorrentStore((state) => state.addMagnet);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!link) return;
    try {
      await addMagnet(link);
      setLink('');
    } catch (error) {
      alert('Failed to add torrent');
    }
  };

  return (
    <div className="w-full max-w-lg relative z-20">
      <form onSubmit={handleSubmit} className="relative flex items-center w-full">
        <span className="absolute left-5 text-slate-600">
           <Link size={20} />
        </span>
        <input
          className="w-full bg-black/40 border border-white/5 rounded-2xl py-5 pl-14 pr-16 text-white placeholder-slate-700 focus:outline-none focus:border-primary/40 focus:ring-0 transition-all font-mono text-sm"
          placeholder="magnet:?xt=urn:btih:..."
          type="text"
          value={link}
          onChange={(e) => setLink(e.target.value)}
        />
        <button
          type="submit"
          className="absolute right-3 p-2.5 bg-primary/80 hover:bg-primary text-white rounded-xl transition-all shadow-lg shadow-primary/20"
        >
          <ArrowRight size={20} />
        </button>
      </form>
    </div>
  );
}
