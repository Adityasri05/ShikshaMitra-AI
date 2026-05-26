from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas_db import Student
from app.schemas.validation import StudentCreate, StudentResponse
import random

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=StudentResponse)
def register_student(student_in: StudentCreate, db: Session = Depends(get_db)):
    # Clean empty strings to None to prevent SQLite Unique constraints on null strings
    phone_number = student_in.phone_number if student_in.phone_number else None
    email = student_in.email if student_in.email else None

    # Check if phone number already registered
    if phone_number:
        existing = db.query(Student).filter(Student.phone_number == phone_number).first()
        if existing:
            return existing

    new_student = Student(
        name=student_in.name,
        phone_number=phone_number,
        email=email,
        class_level=student_in.class_level,
        preferred_dialect=student_in.preferred_dialect,
        xp=random.randint(100, 300),
        streak=random.randint(2, 5),
        level=1,
        study_hours=random.uniform(2.5, 10.0),
        offline_mode=False
    )
    
    db.add(new_student)
    db.commit()
    db.refresh(new_student)
    return new_student

@router.get("/student/{student_id}", response_model=StudentResponse)
def get_student_profile(student_id: int, db: Session = Depends(get_db)):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student profile not found")
    return student
