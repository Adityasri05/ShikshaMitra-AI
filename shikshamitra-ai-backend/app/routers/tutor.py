from fastapi import APIRouter, Depends, HTTPException, UploadFile, File, Form
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas_db import Student, AIConversation
from app.schemas.validation import ChatMessageResponse
from app.services.agents import TutorAgent, MotivationAgent
import datetime

router = APIRouter(prefix="/tutor", tags=["AI Tutor Chat"])

@router.post("/chat", response_model=ChatMessageResponse)
async def ask_tutor(
    student_id: int = Form(...),
    message_text: str = Form(...),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # 1. Log student query in db
    user_msg = AIConversation(
        student_id=student_id,
        sender="user",
        message_text=message_text,
        sentiment_signal="confused"
    )
    db.add(user_msg)

    # 2. Query the Agent layer
    ai_reply_text = TutorAgent.answer_query(message_text, student.preferred_dialect)
    
    # 3. Log AI response in db
    ai_msg = AIConversation(
        student_id=student_id,
        sender="ai",
        message_text=ai_reply_text,
        sentiment_signal="confident"
    )
    db.add(ai_msg)
    
    # Reward XP for active participation
    student.xp += 10
    if student.xp >= student.level * 200:
        student.xp = 0
        student.level += 1
        
    db.commit()
    db.refresh(ai_msg)
    return ai_msg

@router.post("/upload-notebook", response_model=ChatMessageResponse)
async def upload_notebook(
    student_id: int = Form(...),
    notebook_photo: UploadFile = File(...),
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Read the upload bytes
    contents = await notebook_photo.read()
    
    # Log user notebook action
    user_msg = AIConversation(
        student_id=student_id,
        sender="user",
        message_text=f"📝 [ notebook photo: {notebook_photo.filename} ]",
        image_url=notebook_photo.filename
    )
    db.add(user_msg)

    # Invoke Agent with image parameters
    ai_reply_text = TutorAgent.answer_query("कृपया मेरी नोटबुक के इस प्रश्न को हल करें।", student.preferred_dialect, image_data=contents)
    
    ai_msg = AIConversation(
        student_id=student_id,
        sender="ai",
        message_text=ai_reply_text,
        sentiment_signal="confident"
    )
    db.add(ai_msg)
    
    student.xp += 15
    db.commit()
    db.refresh(ai_msg)
    return ai_msg
