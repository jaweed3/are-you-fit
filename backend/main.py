from fastapi import FastAPI, UploadFile, File, Form, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
import os
import uuid
from pathlib import Path
from typing import Dict, Any, List, Optional

from models.resume_parser import ResumeParser
from models.job_matcher import JobMatcher
from models.resume_enhancer import ResumeEnhancer
from database.db import db

app = FastAPI(title="AreUFit API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # In production, replace with specific origins
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create upload directory if it doesn't exist
UPLOAD_DIR = Path("uploads")
UPLOAD_DIR.mkdir(exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "Welcome to AreUFit API"}

@app.post("/api/upload/resume")
async def upload_resume(file: UploadFile = File(...)):
    """Upload and parse a resume file"""
    # Check file extension
    if not file.filename.lower().endswith(('.pdf', '.docx', '.doc')):
        raise HTTPException(status_code=400, detail="Only PDF and Word documents are supported")
    
    # Generate unique filename
    file_extension = os.path.splitext(file.filename)[1]
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = UPLOAD_DIR / unique_filename
    
    # Save file
    with open(file_path, "wb") as buffer:
        buffer.write(await file.read())
    
    # Parse resume
    try:
        parser = ResumeParser()
        parsed_data = parser.parse(str(file_path))
        
        # Save to database
        user_id = "anonymous"  # In a real app, get from auth
        resume_id = db.save_resume(
            user_id=user_id,
            filename=unique_filename,
            original_filename=file.filename,
            file_path=str(file_path),
            parsed_data=parsed_data
        )
        
        return {
            "message": "Resume uploaded and parsed successfully",
            "filename": unique_filename,
            "parsed_data": parsed_data
        }
    except Exception as e:
        # Clean up file if parsing fails
        if file_path.exists():
            os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Error parsing resume: {str(e)}")

@app.post("/api/match/job")
async def match_job(data: Dict[str, Any]):
    """Match resume with job description"""
    resume_id = data.get("resume_id")
    job_description = data.get("job_description")
    job_title = data.get("job_title")
    
    if not resume_id or not job_description:
        raise HTTPException(status_code=400, detail="Resume ID and job description are required")
    
    # Get resume from database or file
    resume_data = db.get_resume(resume_id)
    if not resume_data:
        # Try to get from file directly
        file_path = UPLOAD_DIR / resume_id
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="Resume not found")
        
        parser = ResumeParser()
        resume_text = parser.extract_text(str(file_path))
    else:
        # Use parsed data from database
        resume_text = " ".join([
            resume_data["parsed_data"].get("summary", ""),
            " ".join(resume_data["parsed_data"].get("experience", [])),
            " ".join(resume_data["parsed_data"].get("education", [])),
            " ".join(resume_data["parsed_data"].get("skills", []))
        ])
    
    # Match resume with job
    matcher = JobMatcher()
    match_result = matcher.match(resume_text, job_description)
    
    # Save match result to database
    match_id = db.save_job_match(
        resume_id=resume_id,
        job_description=job_description,
        job_title=job_title,
        match_result=match_result
    )
    
    return {
        "message": "Job matching completed",
        "match_id": match_id,
        **match_result
    }

@app.post("/api/improve/suggestions")
async def get_suggestions(data: Dict[str, Any]):
    """Get improvement suggestions for a resume"""
    resume_id = data.get("resume_id")
    job_title = data.get("job_title")
    
    if not resume_id:
        raise HTTPException(status_code=400, detail="Resume ID is required")
    
    # Get resume from database
    resume_data = db.get_resume(resume_id)
    if not resume_data:
        # Try to get from file directly
        file_path = UPLOAD_DIR / resume_id
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="Resume not found")
        
        parser = ResumeParser()
        resume_data = {"parsed_data": parser.parse(str(file_path))}
    
    # Get suggestions
    enhancer = ResumeEnhancer()
    suggestions = enhancer.get_suggestions(resume_data["parsed_data"], job_title)
    
    return {
        "message": "Suggestions generated successfully",
        **suggestions
    }

if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)