import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Typography,
  CircularProgress,
  Alert,
  Paper,
} from '@mui/material';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { resumeService } from '../../services/api';
import { useResume } from '../../context/ResumeContext';

const JobDescriptionInput = () => {
    const { resumeData, setMatchResults } = useResume();
    const [jobDescription, setJobDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    
    const handleAnalyze = async () => {
      if (!resumeData.id || !jobDescription.trim()) {
        setError('Please select a resume and enter a job description.');
        return;
      }
      
      try {
        setLoading(true);
        setError(null);
        
        const response = await resumeService.matchJob(resumeData.id, jobDescription);
        setMatchResults(response.data);
        
        setLoading(false);
      } catch (err) {
        setError('Failed to analyze job match. Please try again.');
        setLoading(false);
      }
    };
    
    return (
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Job Description Analysis
        </Typography>
        
        <Typography variant="body2" color="text.secondary" paragraph>
          Paste a job description below to analyze how well your resume matches the requirements.
        </Typography>
        
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}
        
        <TextField
          fullWidth
          multiline
          rows={8}
          label="Job Description"
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          placeholder="Paste the job description here..."
          sx={{ mb: 2 }}
        />
        
        <Box sx={{ display: 'flex', justifyContent: 'flex-end' }}>
          <Button
            variant="contained"
            color="primary"
            startIcon={loading ? <CircularProgress size={20} color="inherit" /> : <AnalyticsIcon />}
            onClick={handleAnalyze}
            disabled={loading || !jobDescription.trim()}
          >
            {loading ? 'Analyzing...' : 'Analyze Match'}
          </Button>
        </Box>
      </Paper>
    );
  };
  
  export default JobDescriptionInput;
  