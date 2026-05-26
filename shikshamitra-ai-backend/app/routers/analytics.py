from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.database import get_db
from app.models.schemas_db import Student, LearningAnalytics
from app.schemas.validation import AnalyticsResponse
from app.services.agents import DiagnosticAgent, MotivationAgent
from typing import List

router = APIRouter(prefix="/analytics", tags=["Learning Analytics"])


@router.get("/student/{student_id}", response_model=List[AnalyticsResponse])
def get_student_analytics(student_id: int, db: Session = Depends(get_db)):
    """Retrieve all learning analytics records for a student."""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    analytics = db.query(LearningAnalytics).filter(
        LearningAnalytics.student_id == student_id
    ).all()
    return analytics


@router.get("/diagnostic/{student_id}")
def run_diagnostic(student_id: int, subject: str = "Mathematics", db: Session = Depends(get_db)):
    """Run the Diagnostic Agent on a student's quiz history to detect weaknesses."""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Gather all accuracy rates for the given subject
    records = db.query(LearningAnalytics).filter(
        LearningAnalytics.student_id == student_id,
        LearningAnalytics.subject == subject
    ).all()

    scores = [r.accuracy_rate for r in records] if records else [55, 72, 38]  # demo fallback
    assessment = DiagnosticAgent.analyze_performance(subject, scores)

    return {
        "student_id": student_id,
        "subject": subject,
        "records_analyzed": len(scores),
        "assessment": assessment
    }


@router.get("/motivation/{student_id}")
def get_motivation(student_id: int, db: Session = Depends(get_db)):
    """Get a personalized motivational nudge for the student."""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    # Fetch last quiz score if available
    last_record = db.query(LearningAnalytics).filter(
        LearningAnalytics.student_id == student_id
    ).order_by(LearningAnalytics.id.desc()).first()

    last_score = last_record.accuracy_rate if last_record else 70

    nudge = MotivationAgent.get_motivational_nudge(student.streak, last_score)

    return {
        "student_id": student_id,
        "streak": student.streak,
        "level": student.level,
        "xp": student.xp,
        "nudge_message": nudge
    }


@router.get("/leaderboard")
def get_leaderboard(limit: int = 10, db: Session = Depends(get_db)):
    """Return top students by XP for the gamification leaderboard."""
    students = db.query(Student).order_by(Student.xp.desc()).limit(limit).all()
    return [
        {
            "rank": idx + 1,
            "name": s.name,
            "xp": s.xp,
            "streak": s.streak,
            "level": s.level,
            "class_level": s.class_level
        }
        for idx, s in enumerate(students)
    ]


@router.get("/heatmap/{student_id}")
def get_weakness_heatmap(student_id: int, db: Session = Depends(get_db)):
    """Generate a subject-chapter weakness heatmap for teachers and parents."""
    student = db.query(Student).filter(Student.id == student_id).first()
    if not student:
        raise HTTPException(status_code=404, detail="Student not found")

    records = db.query(LearningAnalytics).filter(
        LearningAnalytics.student_id == student_id
    ).all()

    if not records:
        # Return demo heatmap for presentation
        return {
            "student_id": student_id,
            "heatmap": [
                {"subject": "Mathematics", "chapter": "त्रिकोणमिति (Trigonometry)", "mastery": 32, "status": "critical"},
                {"subject": "Science", "chapter": "प्रकाश परावर्तन (Reflection)", "mastery": 72, "status": "average"},
                {"subject": "Mathematics", "chapter": "बीजगणित (Algebra)", "mastery": 85, "status": "good"},
                {"subject": "English", "chapter": "Active/Passive Voice", "mastery": 90, "status": "excellent"},
                {"subject": "Science", "chapter": "धातु और अधातु (Metals)", "mastery": 55, "status": "needs_focus"},
            ]
        }

    heatmap = []
    for r in records:
        if r.mastery_percentage < 40:
            status = "critical"
        elif r.mastery_percentage < 60:
            status = "needs_focus"
        elif r.mastery_percentage < 80:
            status = "average"
        elif r.mastery_percentage < 90:
            status = "good"
        else:
            status = "excellent"

        heatmap.append({
            "subject": r.subject,
            "chapter": r.chapter_name,
            "mastery": r.mastery_percentage,
            "status": status
        })

    return {"student_id": student_id, "heatmap": heatmap}
