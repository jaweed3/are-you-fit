# AreUFit - Resume Job Matcher

AreUFit is an AI-powered application that analyzes how well your resume matches with job descriptions. It provides personalized recommendations to improve your resume and suggests skills to develop to increase your chances of landing your desired job.

## Features

- Resume parsing (PDF and DOCX formats)
- Job description analysis
- Skills matching and gap identification
- Match score calculation
- Personalized resume improvement suggestions
- Skill development recommendations
- Course recommendations

## Project Structure

```
AreUFit/
├── backend/
│   ├── api/
│   │   ├── __init__.py
│   │   ├── routes.py
│   │   └── utils.py
│   ├── database/
│   │   ├── __init__.py
│   │   └── db.py
│   ├── models/
│   │   ├── __init__.py
│   │   ├── job_matcher.py
│   │   ├── resume_enhancer.py
│   │   └── resume_parser.py
│   ├── __init__.py
│   └── main.py
├── frontend/
│   ├── assets/
│   │   ├── css/
│   │   │   └── styles.css
│   │   ├── icons/
│   │   │   ├── favicon.ico
│   │   │   ├── ai-icon.svg
│   │   │   ├── skills-icon.svg
│   │   │   └── recommendations-icon.svg
│   │   └── images/
│   │       ├── logo.png
│   │       └── hero-image.png
│   ├── js/
│   │   ├── upload.js
│   │   ├── results.js
│   │   └── suggestions.js
│   ├── index.html
│   ├── results.html
│   └── suggestions.html
├── server.py
├── requirements.txt
└── README.md
```

## Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/AreUFit.git
   cd AreUFit
   ```

2. Create a virtual environment (optional but recommended):
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

3. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```

4. Download required SpaCy model:
   ```bash
   python -m spacy download en_core_web_md
   ```

## Usage

1. Start the backend server:
   ```bash
   python server.py
   ```

2. Open your browser and navigate to:
   ```
   http://localhost:8000
   ```

3. Upload your resume, enter a job title and description, and get your match analysis.

## API Endpoints

- `POST /api/upload/resume` - Upload and parse a resume
- `POST /api/match/job` - Match a resume with a job description
- `POST /api/improve/suggestions` - Get improvement suggestions

## Development

### Backend

The backend is built with FastAPI and uses:
- PyMuPDF and python-docx for resume parsing
- SpaCy for NLP processing
- scikit-learn for TF-IDF vectorization and cosine similarity
- SQLite for database storage

### Frontend

The frontend is built with vanilla HTML, CSS, and JavaScript.

## Future Improvements

- User authentication and profile management
- Resume history and comparison
- More detailed skill analysis
- Integration with job boards
- Resume builder with AI suggestions
- Mobile app version

## License

This project is licensed under the MIT License - see the LICENSE file for details.
```

Untuk memastikan aplikasi berjalan dengan baik, Anda perlu membuat beberapa file tambahan yang belum kita buat sebelumnya:

```python:AreUFit/backend/__init__.py
# Empty init file to make the directory a package
```

```python:AreUFit/backend/api/__init__.py
# Empty init file to make the directory a package
```

```python:AreUFit/backend/database/__init__.py
# Empty init file to make the directory a package
```

```python:AreUFit/backend/models/__init__.py
# Empty init file to make the directory a package