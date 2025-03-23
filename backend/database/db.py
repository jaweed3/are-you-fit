import sqlite3
from pathlib import Path
import json
import uuid
from datetime import datetime

class Database:
    def __init__(self, db_path="database.sqlite"):
        self.db_path = Path(db_path)
        self.conn = None
        self.init_db()
    
    def init_db(self):
        """Initialize database and create tables if they don't exist"""
        self.conn = sqlite3.connect(self.db_path)
        self.conn.row_factory = sqlite3.Row  # Return rows as dictionaries
        
        # Create tables
        cursor = self.conn.cursor()
        
        # Users table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS users (
            id TEXT PRIMARY KEY,
            email TEXT UNIQUE,
            name TEXT,
            created_at TEXT
        )
        ''')
        
        # Resumes table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS resumes (
            id TEXT PRIMARY KEY,
            user_id TEXT,
            filename TEXT,
            original_filename TEXT,
            file_path TEXT,
            parsed_data TEXT,
            uploaded_at TEXT,
            FOREIGN KEY (user_id) REFERENCES users (id)
        )
        ''')
        
        # Job matches table
        cursor.execute('''
        CREATE TABLE IF NOT EXISTS job_matches (
            id TEXT PRIMARY KEY,
            resume_id TEXT,
            job_description TEXT,
            job_title TEXT,
            overall_match REAL,
            skills_match TEXT,
            missing_skills TEXT,
            recommendations TEXT,
            created_at TEXT,
            FOREIGN KEY (resume_id) REFERENCES resumes (id)
        )
        ''')
        
        self.conn.commit()
    
    def close(self):
        """Close database connection"""
        if self.conn:
            self.conn.close()
    
    def create_user(self, email, name):
        """Create a new user"""
        user_id = str(uuid.uuid4())
        created_at = datetime.now().isoformat()
        
        cursor = self.conn.cursor()
        cursor.execute(
            "INSERT INTO users (id, email, name, created_at) VALUES (?, ?, ?, ?)",
            (user_id, email, name, created_at)
        )
        self.conn.commit()
        
        return user_id
    
    def get_user_by_email(self, email):
        """Get user by email"""
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM users WHERE email = ?", (email,))
        row = cursor.fetchone()
        
        if row:
            return dict(row)
        return None
    
    def save_resume(self, user_id, filename, original_filename, file_path, parsed_data):
        """Save resume information"""
        resume_id = str(uuid.uuid4())
        uploaded_at = datetime.now().isoformat()
        
        cursor = self.conn.cursor()
        cursor.execute(
            "INSERT INTO resumes (id, user_id, filename, original_filename, file_path, parsed_data, uploaded_at) VALUES (?, ?, ?, ?, ?, ?, ?)",
            (resume_id, user_id, filename, original_filename, file_path, json.dumps(parsed_data), uploaded_at)
        )
        self.conn.commit()
        
        return resume_id
    
    def get_resume(self, resume_id):
        """Get resume by ID"""
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM resumes WHERE id = ?", (resume_id,))
        row = cursor.fetchone()
        
        if row:
            result = dict(row)
            result['parsed_data'] = json.loads(result['parsed_data'])
            return result
        return None
    
    def save_job_match(self, resume_id, job_description, job_title, match_result):
        """Save job match results"""
        match_id = str(uuid.uuid4())
        created_at = datetime.now().isoformat()
        
        cursor = self.conn.cursor()
        cursor.execute(
            "INSERT INTO job_matches (id, resume_id, job_description, job_title, overall_match, skills_match, missing_skills, recommendations, created_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)",
            (
                match_id, 
                resume_id, 
                job_description, 
                job_title, 
                match_result['overall_match'],
                json.dumps(match_result['skills_match']),
                json.dumps(match_result['missing_skills']),
                json.dumps(match_result['recommendations']),
                created_at
            )
        )
        self.conn.commit()
        
        return match_id
    
    def get_job_match(self, match_id):
        """Get job match by ID"""
        cursor = self.conn.cursor()
        cursor.execute("SELECT * FROM job_matches WHERE id = ?", (match_id,))
        row = cursor.fetchone()
        
        if row:
            result = dict(row)
            result['skills_match'] = json.loads(result['skills_match'])
            result['missing_skills'] = json.loads(result['missing_skills'])
            result['recommendations'] = json.loads(result['recommendations'])
            return result
        return None

# Create database instance
db = Database()