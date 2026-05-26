from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas_db import Student, LearningAnalytics
from app.schemas.validation import QuizQuestionResponse
from app.services.agents import QuizGeneratorAgent, DiagnosticAgent
import random

router = APIRouter(prefix="/quiz", tags=["Adaptive Quizzes"])

@router.get("/generate", response_model=QuizQuestionResponse)
def get_adaptive_question(chapter: str, difficulty: str = "medium"):
    # Generate question from Agent logic
    q_data = QuizGeneratorAgent.generate_question(chapter, difficulty)
    
    # Simulate a mockup primary key index
    mock_id = random.randint(1000, 9999)
    return QuizQuestionResponse(
        id=mock_id,
        subject=q_data["subject"],
        chapter=q_data["chapter"],
        question_text=q_data["question_text"],
        options=q_data["options"],
        correct_option=q_data["correct_option"],
        explanation_text=q_data["explanation_text"],
        pyq_years="2024, 2022",
        importance_tag=q_data["importance_tag"],
        difficulty_level=q_data["difficulty_level"]
    )

@router.post("/submit")
def submit_quiz_score(
    student_id: int,
    subject: str,
    chapter: str,
    score: int, # 0 to 100
    db: Session = Depends(get_db)
):
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Save to analytics logs
    analysis_record = db.query(LearningAnalytics).filter(
        LearningAnalytics.student_id == student_id,
        LearningAnalytics.chapter_name == chapter
    ).first()

    # Diagnostic Agent run to assess student strengths/weaknesses
    assessment = DiagnosticAgent.analyze_performance(subject, [score])

    if not analysis_record:
        analysis_record = LearningAnalytics(
            student_id=student_id,
            subject=subject,
            chapter_name=chapter,
            mastery_percentage=score,
            confidence_score=assessment["confidence_score"],
            weak_topic_detected=assessment["weakness_flag"],
            accuracy_rate=score,
            revision_priority="high" if assessment["weakness_flag"] else "low"
        )
        db.add(analysis_record)
    else:
        analysis_record.accuracy_rate = int((analysis_record.accuracy_rate + score) / 2)
        analysis_record.mastery_percentage = score
        analysis_record.confidence_score = assessment["confidence_score"]
        analysis_record.weak_topic_detected = assessment["weakness_flag"]
        analysis_record.revision_priority = "high" if assessment["weakness_flag"] else "low"

    # Reward XP points
    student.xp += 20 if score >= 80 else 5
    if score >= 80:
        student.streak += 1

    db.commit()
    
    return {
        "status": "success",
        "student_xp": student.xp,
        "streak_count": student.streak,
        "diagnostic_assessment": assessment
    }
