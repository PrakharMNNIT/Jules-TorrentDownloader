import libtorrent as lt
import time
import os
import shutil
import asyncio
import tempfile

class TorrentManager:
    def __init__(self, download_path: str = None):
        self.ses = lt.session()
        self.ses.listen_on(6881, 6891)
        self.download_path = download_path or os.path.join(tempfile.gettempdir(), "stitch_downloads")

        if not os.path.exists(self.download_path):
            os.makedirs(self.download_path)

        # Default settings
        settings = {
            'user_agent': 'StitchTorrent/1.0',
            'download_rate_limit': 0,
            'upload_rate_limit': 0,
        }
        self.ses.apply_settings(settings)
        print(f"Torrent Engine initialized. Downloads at: {self.download_path}")

    def add_magnet(self, magnet_link: str):
        try:
            params = lt.parse_magnet_uri(magnet_link)
            params.save_path = self.download_path

            # Check if already exists
            handle = self.find_handle_by_hash(params.info_hash)
            if handle:
                return {"status": "exists", "name": handle.status().name, "info_hash": str(params.info_hash)}

            handle = self.ses.add_torrent(params)
            return {"status": "added", "name": handle.status().name, "info_hash": str(handle.info_hash())}
        except Exception as e:
            print(f"Error adding magnet: {e}")
            raise e

    def find_handle_by_hash(self, info_hash):
        torrents = self.ses.get_torrents()
        for t in torrents:
            if str(t.info_hash()) == str(info_hash):
                return t
        return None

    def find_handle_by_id(self, torrent_id: str):
        # We use info_hash as ID
        torrents = self.ses.get_torrents()
        for t in torrents:
            if str(t.info_hash()) == torrent_id:
                return t
        return None

    def get_all_status(self):
        torrents = []
        handles = self.ses.get_torrents()
        for handle in handles:
            s = handle.status()
            state_str = ['queued', 'checking', 'downloading_metadata', 'downloading', 'finished', 'seeding', 'allocating', 'checking_resume_data'][s.state]

            try:
                progress = s.progress * 100
            except:
                progress = 0

            torrents.append({
                "id": str(handle.info_hash()),
                "name": s.name,
                "progress": progress,
                "state": state_str,
                "download_rate": s.download_rate,
                "upload_rate": s.upload_rate,
                "total_downloaded": s.total_done,
                "total_uploaded": s.total_upload,
                "num_peers": s.num_peers,
                "num_seeds": s.num_seeds,
                "save_path": s.save_path,
                "is_paused": s.flags & lt.torrent_flags.paused
            })
        return torrents

    def get_global_transfer_info(self):
        total_download_rate = 0
        total_upload_rate = 0
        handles = self.ses.get_torrents()
        for handle in handles:
            s = handle.status()
            total_download_rate += s.download_rate
            total_upload_rate += s.upload_rate

        return {
            "download_rate": total_download_rate,
            "upload_rate": total_upload_rate
        }

    def pause_torrent(self, torrent_id: str):
        handle = self.find_handle_by_id(torrent_id)
        if handle:
            handle.pause()
            return True
        return False

    def resume_torrent(self, torrent_id: str):
        handle = self.find_handle_by_id(torrent_id)
        if handle:
            handle.resume()
            return True
        return False

    def delete_torrent(self, torrent_id: str, delete_files: bool = False):
        handle = self.find_handle_by_id(torrent_id)
        if handle:
            if delete_files:
                self.ses.remove_torrent(handle, lt.options.delete_files)
            else:
                self.ses.remove_torrent(handle)
            return True
        return False

# Singleton instance
engine = TorrentManager()
