import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000/api';

// Create axios instance
const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add request interceptor for auth token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Resume services
export const resumeService = {
  analyzeResume: (resumeData, jobDescription = null) => {
    return api.post('/resume/analyze', { resume: resumeData, job_description: jobDescription });
  },
  
  optimizeResume: (resumeData, jobDescription) => {
    return api.post('/resume/optimize', { resume: resumeData, job_description: jobDescription });
  },
  
  improveResume: (resumeData, jobDescription = null) => {
    return api.post('/resume/improve', { resume: resumeData, job_description: jobDescription });
  },
  
  matchToJob: (resumeData, jobDescription) => {
    return api.post('/resume/match', { resume: resumeData, job_description: jobDescription });
  },
  
  getSimilarJobs: (resumeData, jobDescription) => {
    return api.post('/resume/similar-jobs', { resume: resumeData, job_description: jobDescription });
  },
};

// Auth services
export const authService = {
  login: (email, password) => {
    return api.post('/auth/login', { email, password });
  },
  
  register: (email, password, name) => {
    return api.post('/auth/register', { email, password, name });
  },
  
  getCurrentUser: () => {
    return api.get('/auth/me');
  },
  
  logout: () => {
    localStorage.removeItem('token');
  },
};

export default api;