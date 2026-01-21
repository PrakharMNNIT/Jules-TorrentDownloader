import { create } from 'zustand'

export const useTorrentStore = create((set, get) => ({
  torrents: [],
  globalStats: { download_rate: 0, upload_rate: 0 },
  socket: null,
  isConnected: false,

  connectWebSocket: () => {
    if (get().socket) return;

    const ws = new WebSocket('ws://localhost:8000/ws');

    ws.onopen = () => {
      console.log('Connected to WebSocket');
      set({ isConnected: true });
    };

    ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        set({
          torrents: data.torrents || [],
          globalStats: data.global || { download_rate: 0, upload_rate: 0 }
        });
      } catch (e) {
        console.error('Error parsing WS message', e);
      }
    };

    ws.onclose = () => {
      console.log('Disconnected from WebSocket');
      set({ isConnected: false, socket: null });
      // Reconnect after 3 seconds
      setTimeout(() => get().connectWebSocket(), 3000);
    };

    set({ socket: ws });
  },

  addMagnet: async (magnetLink) => {
    try {
      const response = await fetch('http://localhost:8000/torrent/magnet', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ link: magnetLink }),
      });
      return await response.json();
    } catch (error) {
      console.error('Error adding magnet:', error);
      throw error;
    }
  },

  performAction: async (id, action) => {
    try {
      await fetch(`http://localhost:8000/torrent/${id}/action`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action }),
      });
    } catch (error) {
      console.error(`Error performing ${action}:`, error);
    }
  }
}))
