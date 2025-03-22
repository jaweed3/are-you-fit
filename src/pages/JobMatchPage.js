import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Paper,
  Grid,
  CircularProgress,
  Alert,
} from '@mui/material';
import { useResume } from '../context/ResumeContext';
import { resumeService } from '../services/api';
import ResumeSelector from '../components/resume/ResumeSelector';
import JobDescriptionInput from '../components/job/JobDescriptionInput';
import AnalysisResults from '../components/analysis/AnalysisResults';

const JobMatchPage = () => {
  const location = useLocation();
  const { resumeData, setResumeData, matchResults } = useResume();
  
  const [resumes, setResumes] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchResumes();
    
    // If resumeId is passed via state, load that resume
    if (location.state?.resumeId) {
      fetchResume(location.state.resumeId);
    }
  }, [location.state]);
  
  const fetchResumes = async () => {
    try {
      setLoading(true);
      
      const response = await resumeService.getResumes();
      setResumes(response.data);
      
      // If no resume is selected and we have resumes, select the first one
      if (!resumeData.id && response.data.length > 0 && !location.state?.resumeId) {
        fetchResume(response.data[0].id);
      }
      
      setLoading(false);
    } catch (err) {
      setError('Failed to load resumes. Please try again.');
      setLoading(false);
    }
  };
  
  const fetchResume = async (resumeId) => {
    try {
      const response = await resumeService.getResume(resumeId);
      setResumeData(response.data);
    } catch (err) {
      setError('Failed to load resume. Please try again.');
    }
  };
  
  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Job Match Analysis
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Compare your resume to job descriptions to see how well you match
        </Typography>
      </Box>
      
      {error && (
        <Alert severity="error" sx={{ mb: 3 }}>
          {error}
        </Alert>
      )}
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <ResumeSelector 
            resumes={resumes} 
            selectedResumeId={resumeData.id} 
            onSelectResume={fetchResume}
            loading={loading}
          />
        </Grid>
        
        <Grid item xs={12} md={8}>
          <JobDescriptionInput />
          
          {matchResults && (
            <Box sx={{ mt: 3 }}>
              <AnalysisResults results={matchResults} />
            </Box>
          )}
        </Grid>
      </Grid>
    </Container>
  );
};

export default JobMatchPage;