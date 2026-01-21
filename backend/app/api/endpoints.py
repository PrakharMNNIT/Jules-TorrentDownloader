from fastapi import APIRouter, WebSocket, WebSocketDisconnect, HTTPException
from pydantic import BaseModel
from typing import List, Optional
import asyncio
import json
from backend.app.core.torrent_engine import engine

router = APIRouter()

class MagnetRequest(BaseModel):
    link: str

class TorrentAction(BaseModel):
    action: str  # pause, resume, delete

@router.post("/torrent/magnet")
async def add_magnet(request: MagnetRequest):
    try:
        result = engine.add_magnet(request.link)
        return result
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@router.get("/torrent/status")
async def get_status():
    return engine.get_all_status()

@router.post("/torrent/{id}/action")
async def torrent_action(id: str, action: TorrentAction):
    if action.action == "pause":
        success = engine.pause_torrent(id)
    elif action.action == "resume":
        success = engine.resume_torrent(id)
    elif action.action == "delete":
        success = engine.delete_torrent(id, delete_files=False)
    elif action.action == "delete_with_files":
         success = engine.delete_torrent(id, delete_files=True)
    else:
        raise HTTPException(status_code=400, detail="Invalid action")

    if not success:
         raise HTTPException(status_code=404, detail="Torrent not found")
    return {"status": "success", "action": action.action, "id": id}

@router.get("/system/performance")
async def system_performance():
    return engine.get_global_transfer_info()

# WebSocket for real-time updates
class ConnectionManager:
    def __init__(self):
        self.active_connections: List[WebSocket] = []

    async def connect(self, websocket: WebSocket):
        await websocket.accept()
        self.active_connections.append(websocket)

    def disconnect(self, websocket: WebSocket):
        self.active_connections.remove(websocket)

    async def broadcast(self, message: str):
        for connection in self.active_connections:
            try:
                await connection.send_text(message)
            except:
                pass

manager = ConnectionManager()

@router.websocket("/ws")
async def websocket_endpoint(websocket: WebSocket):
    await manager.connect(websocket)
    try:
        while True:
            status = engine.get_all_status()
            global_stats = engine.get_global_transfer_info()

            data = {
                "torrents": status,
                "global": global_stats
            }
            await websocket.send_text(json.dumps(data))
            await asyncio.sleep(1)
    except WebSocketDisconnect:
        manager.disconnect(websocket)
