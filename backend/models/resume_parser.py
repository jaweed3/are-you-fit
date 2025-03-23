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
        result = {
            'name': name,
            'email': email,
            'phone': phone,
            'skills': skills,
            **sections
        }
        
        return result
    
    def extract_text(self, file_path: str) -> str:
        """Extract text from PDF or DOCX file"""
        file_ext = os.path.splitext(file_path)[1].lower()
        
        if file_ext == '.pdf':
            return self._extract_text_from_pdf(file_path)
        elif file_ext in ['.docx', '.doc']:
            return self._extract_text_from_docx(file_path)
        else:
            raise ValueError(f"Unsupported file format: {file_ext}")
    
    def _extract_text_from_pdf(self, file_path: str) -> str:
        """Extract text from PDF file"""
        text = ""
        try:
            doc = fitz.open(file_path)
            for page in doc:
                text += page.get_text()
            doc.close()
        except Exception as e:
            raise Exception(f"Error extracting text from PDF: {str(e)}")
        return text
    
    def _extract_text_from_docx(self, file_path: str) -> str:
        """Extract text from DOCX file"""
        text = ""
        try:
            doc = docx.Document(file_path)
            for para in doc.paragraphs:
                text += para.text + "\n"
        except Exception as e:
            raise Exception(f"Error extracting text from DOCX: {str(e)}")
        return text
    
    def extract_name(self, text: str) -> Optional[str]:
        """Extract name from resume text"""
        # Use first few lines as potential name
        lines = text.split('\n')
        for i in range(min(5, len(lines))):
            line = lines[i].strip()
            if line and len(line) < 50 and not re.search(self.email_pattern, line) and not re.search(self.phone_pattern, line):
                # Process with spaCy to check for person names
                doc = self.nlp(line)
                for ent in doc.ents:
                    if ent.label_ == "PERSON":
                        return ent.text
                # If no entity found but line looks like a name, return it
                if len(line.split()) <= 4 and all(word[0].isupper() for word in line.split() if word):
                    return line
        return None
    
    def extract_email(self, text: str) -> Optional[str]:
        """Extract email from resume text"""
        match = re.search(self.email_pattern, text)
        return match.group(0) if match else None
    
    def extract_phone(self, text: str) -> Optional[str]:
        """Extract phone number from resume text"""
        match = re.search(self.phone_pattern, text)
        return match.group(0) if match else None
    
    def extract_sections(self, text: str) -> Dict[str, Any]:
        """Extract different sections from resume text"""
        result = {}
        
        # Split text into lines
        lines = text.split('\n')
        
        # Identify section headers
        section_indices = {}
        for i, line in enumerate(lines):
            line_lower = line.lower().strip()
            for section, headers in self.section_headers.items():
                if any(header == line_lower or line_lower.startswith(header + ':') for header in headers):
                    section_indices[i] = section
        
        # Sort section indices
        sorted_indices = sorted(section_indices.keys())
        
        # Extract section content
        for i in range(len(sorted_indices)):
            start_idx = sorted_indices[i]
            end_idx = sorted_indices[i+1] if i+1 < len(sorted_indices) else len(lines)
            section_name = section_indices[start_idx]
            
            # Extract section content (skip the header line)
            section_content = '\n'.join(lines[start_idx+1:end_idx]).strip()
            
            if section_name == 'summary':
                result[section_name] = section_content
            elif section_name in ['experience', 'education', 'projects', 'certifications']:
                result[section_name] = self._parse_list_section(section_content)
            elif section_name == 'skills':
                # Skills are extracted separately with NLP
                pass
            else:
                result[section_name] = section_content
        
        return result
    
    def _parse_list_section(self, section_content: str) -> List[str]:
        """Parse sections that contain lists (experience, education, etc.)"""
        # Split by common bullet points or numbers
        items = re.split(r'\n\s*[\•\-\*\–\—\→]|\n\s*\d+\.', section_content)
        return [item.strip() for item in items if item.strip()]
    
    def extract_skills(self, text: str) -> List[str]:
        """Extract skills from resume text"""
        skills = []
        
        # Look for skills section
        lines = text.split('\n')
        in_skills_section = False
        skills_section_text = ""
        
        for i, line in enumerate(lines):
            line_lower = line.lower().strip()
            
            # Check if this line is a skills section header
            if any(header == line_lower or line_lower.startswith(header + ':') for header in self.section_headers['skills']):
                in_skills_section = True
                continue
            
            # Check if we've reached the next section
            if in_skills_section:
                for section, headers in self.section_headers.items():
                    if section != 'skills' and any(header == line_lower or line_lower.startswith(header + ':') for header in headers):
                        in_skills_section = False
                        break
            
            # Add line to skills section text if we're in the skills section
            if in_skills_section:
                skills_section_text += line + " "
        
        # Extract skills from skills section
        if skills_section_text:
            # Split by common separators
            skill_items = re.split(r'[\•\-\*\,\;\|]', skills_section_text)
            for item in skill_items:
                item = item.strip()
                if item and len(item) < 50:  # Reasonable skill length
                    skills.append(item)
        
        # Also look for common skills throughout the document
        doc = self.nlp(text.lower())
        for skill in self.common_skills:
            if skill in text.lower():
                if skill not in [s.lower() for s in skills]:
                    skills.append(skill.title())  # Add with title case
        
        return skills
