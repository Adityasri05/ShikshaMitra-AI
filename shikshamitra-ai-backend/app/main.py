from fastapi import FastAPI, WebSocket, WebSocketDisconnect
from fastapi.middleware.cors import CORSMiddleware
from app.config import settings
from app.database import engine, Base
from app.routers import auth, tutor, quiz, planner, analytics, voice
from app.services.agents import TutorAgent
import json

# Initialize database schemas
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    description="Scalable Vernacular AI Agentic backend for UP Board students (ShikshaMitra AI)"
)

# Configure CORS for Next.js web application requests
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], # Allow all origins in hackathon. Can be refined to settings.CORS_ORIGINS in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Connect Core routers
app.include_router(auth.router, prefix=settings.API_V1_STR)
app.include_router(tutor.router, prefix=settings.API_V1_STR)
app.include_router(quiz.router, prefix=settings.API_V1_STR)
app.include_router(planner.router, prefix=settings.API_V1_STR)
app.include_router(analytics.router, prefix=settings.API_V1_STR)
app.include_router(voice.router, prefix=settings.API_V1_STR)

@app.get("/")
def get_root():
    return {
        "status": "active",
        "app_name": settings.PROJECT_NAME,
        "version": settings.VERSION,
        "docs_url": "/docs"
    }

# --- WebSocket Real-Time Connection Manager ---
class ConnectionManager:
    def __init__(self):
        self.active_connections: dict[int, WebSocket] = {}

    async def connect(self, student_id: int, websocket: WebSocket):
        await websocket.accept()
        self.active_connections[student_id] = websocket

    def disconnect(self, student_id: int):
        if student_id in self.active_connections:
            del self.active_connections[student_id]

    async def send_personal_message(self, message: dict, student_id: int):
        if student_id in self.active_connections:
            await self.active_connections[student_id].send_json(message)

manager = ConnectionManager()

@app.websocket("/ws/tutor/{student_id}")
async def websocket_endpoint(websocket: WebSocket, student_id: int):
    await manager.connect(student_id, websocket)
    
    # Send a warm welcome dialect nudge over socket connection
    await manager.send_personal_message({
        "sender": "ai",
        "message_text": "राम राम भैया! हम तोहार शिक्षामित्र एआई हन। कवनो संकोच बिना कुछ भी पूंछेंव! (Realtime websocket active) ⚡",
        "type": "welcome"
    }, student_id)
    
    try:
        while True:
            # Wait for student socket messages
            data = await websocket.receive_text()
            payload = json.loads(data)
            
            # Broadcast typing indicator
            await manager.send_personal_message({
                "type": "typing",
                "is_typing": True
            }, student_id)
            
            # Fetch AI responses from the tutor agent
            query = payload.get("message_text", "")
            dialect = payload.get("dialect", "hinglish")
            
            ai_reply = TutorAgent.answer_query(query, dialect)
            
            # Send final response over sockets
            await manager.send_personal_message({
                "sender": "ai",
                "message_text": ai_reply,
                "type": "message"
            }, student_id)
            
    except WebSocketDisconnect:
        manager.disconnect(student_id)
