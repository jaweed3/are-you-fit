import os
import re
import fitz  # PyMuPDF
import docx
import spacy
from typing import Dict, List, Any, Optional

class ResumeParser:
    def __init__(self):
        # Load spaCy model
        self.nlp = spacy.load("en_core_web_md")
        
        # Define regex patterns
        self.email_pattern = r'\b[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Z|a-z]{2,}\b'
        self.phone_pattern = r'\b(?:\+\d{1,3}[-.\s]?)?\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}\b'
        self.url_pattern = r'(https?://)?([www]\.)?([A-Za-z0-9-]+)(\.[A-Za-z]{2,})+(/[A-Za-z0-9-_.~:/?#[\]@!$&\'()*+,;=]*)?'
        
        # Define section headers
        self.section_headers = {
            'summary': ['summary', 'professional summary', 'profile', 'about me', 'objective'],
            'experience': ['experience', 'work experience', 'employment history', 'work history', 'professional experience'],
            'education': ['education', 'academic background', 'academic history', 'qualifications'],
            'skills': ['skills', 'technical skills', 'core competencies', 'competencies', 'expertise'],
            'projects': ['projects', 'personal projects', 'professional projects'],
            'certifications': ['certifications', 'certificates', 'professional certifications'],
            'languages': ['languages', 'language proficiency'],
            'interests': ['interests', 'hobbies', 'activities']
        }
        
        # Common skills list
        self.common_skills = [
            # Programming languages
            'python', 'java', 'javascript', 'c++', 'c#', 'ruby', 'php', 'swift', 'kotlin', 'go',
            # Web technologies
            'html', 'css', 'react', 'angular', 'vue', 'node.js', 'express', 'django', 'flask', 'spring',
            # Data science
            'machine learning', 'data analysis', 'data science', 'tensorflow', 'pytorch', 'pandas', 'numpy',
            # Databases
            'sql', 'mysql', 'postgresql', 'mongodb', 'oracle', 'sqlite', 'nosql', 'redis',
            # Cloud
            'aws', 'azure', 'gcp', 'cloud computing', 'docker', 'kubernetes', 'serverless',
            # Tools
            'git', 'github', 'gitlab', 'jenkins', 'jira', 'confluence', 'slack', 'trello',
            # Methodologies
            'agile', 'scrum', 'kanban', 'waterfall', 'devops', 'ci/cd', 'test-driven development',
            # Soft skills
            'leadership', 'communication', 'teamwork', 'problem solving', 'critical thinking', 'time management'
        ]
    
    def parse(self, file_path: str) -> Dict[str, Any]:
        """Parse resume file and extract information"""
        # Extract text from file
        text = self.extract_text(file_path)
        
        # Extract basic information
        name = self.extract_name(text)
        email = self.extract_email(text)
        phone = self.extract_phone(text)
        
        # Extract sections
        sections = self.extract_sections(text)
        
        # Extract skills
        skills = self.extract_skills(text)
        
        # Combine all extracted information
