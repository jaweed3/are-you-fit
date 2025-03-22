import React, { useState, useEffect } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  Box, Typography, Container, Grid, Paper, 
  Button, CircularProgress, Alert, FormControl,
  InputLabel, Select, MenuItem, Divider
} from '@mui/material';
import { resumeService } from '../../services/api';
import AnalysisResults from '../../components/analysis/AnalysisResults';
import UploadIcon from '@mui/icons-material/Upload';
import AnalyticsIcon from '@mui/icons-material/Analytics';

const AnalysisPage = () => {
  const { 
    resumeData, 
    updateResumeData, 
    setAnalysisResults, 
    analysisResults,
    loading, 
    setLoading, 
    error, 
    setError 
  } = useResume();
  
  const [userResumes, setUserResumes] = useState([]);
  const [selectedResumeId, setSelectedResumeId] = useState('');
  const [resumeLoading, setResumeLoading] = useState(true);
  const [file, setFile] = useState(null);
  
  useEffect(() => {
    fetchUserResumes();
  }, []);
  
  const fetchUserResumes = async () => {
    try {
      setResumeLoading(true);
      const response = await resumeService.getUserResumes();
      setUserResumes(response.data);
    } catch (err) {
      setError('Failed to fetch your resumes. Please try again later.');
    } finally {
      setResumeLoading(false);
    }
  };
  
  const handleResumeChange = async (event) => {
    const resumeId = event.target.value;
    setSelectedResumeId(resumeId);
    
    if (resumeId === '') {
      updateResumeData({});
      setAnalysisResults(null);
      return;
    }
    
    const selectedResume = userResumes.find(resume => resume.id === resumeId);
    if (selectedResume) {
      updateResumeData(selectedResume);
      if (selectedResume.analysis_results) {
        setAnalysisResults(selectedResume.analysis_results);
      } else {
        setAnalysisResults(null);
      }
    }
  };
  
  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };
  
  const handleFileUpload = async () => {
    if (!file) {
      setError('Please select a file to upload');
      return;
    }
    
    const formData = new FormData();
    formData.append('file', file);
    
    try {
      setLoading(true);
      setError(null);
      
      // Assuming there's an endpoint to parse and analyze uploaded resume
      const response = await resumeService.parseAndAnalyzeResume(formData);
      
      updateResumeData(response.data.resume_data);
      setAnalysisResults(response.data.analysis_results);
      setFile(null);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze uploaded resume.');
    } finally {
      setLoading(false);
    }
  };
  
  const handleAnalyzeSelectedResume = async () => {
    if (!selectedResumeId) {
      setError('Please select a resume to analyze');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await resumeService.analyzeResume(resumeData);
      setAnalysisResults(response.data);
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze resume.');
      setLoading(false);
    }
  };
  
  if (resumeLoading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8 }}>
        <CircularProgress />
      </Box>
    );
  }
  
  return (
    <Container maxWidth="lg">
      <Typography variant="h4" component="h1" gutterBottom>
        Resume Analysis
      </Typography>
      
      <Grid container spacing={4}>
        <Grid item xs={12}>
          <Paper elevation={3} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Select Resume to Analyze
            </Typography>
            
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <FormControl fullWidth>
                  <InputLabel id="resume-select-label">Your Saved Resumes</InputLabel>
                  <Select
                    labelId="resume-select-label"
                    id="resume-select"
                    value={selectedResumeId}
                    label="Your Saved Resumes"
                    onChange={handleResumeChange}
                  >
                    <MenuItem value="">
                      <em>Select a resume</em>
                    </MenuItem>
                    {userResumes.map((resume) => (
                      <MenuItem key={resume.id} value={resume.id}>
                        {resume.personal_info.name || 'Untitled Resume'} - {resume.personal_info.job_title || 'No Job Title'}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleAnalyzeSelectedResume}
                    disabled={!selectedResumeId || loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <AnalyticsIcon />}
                  >
                    {loading ? 'Analyzing...' : 'Analyze Selected Resume'}
                  </Button>
                </Box>
              </Grid>
              
              <Grid item xs={12} md={6}>
                <Divider orientation="vertical" sx={{ display: { xs: 'none', md: 'block' } }} />
                <Divider sx={{ display: { xs: 'block', md: 'none' }, my: 2 }} />
                
                <Typography variant="subtitle1" gutterBottom>
                  Or Upload a Resume
                </Typography>
                
                <Box sx={{ mt: 2 }}>
                  <input
                    accept=".pdf,.doc,.docx,.txt"
                    style={{ display: 'none' }}
                    id="resume-file-upload"
                    type="file"
                    onChange={handleFileChange}
                  />
                  <label htmlFor="resume-file-upload">
                    <Button
                      variant="outlined"
                      component="span"
                      sx={{ mr: 2 }}
                    >
                      Select File
                    </Button>
                  </label>
                  {file && (
                    <Typography variant="body2" component="span">
                      {file.name}
                    </Typography>
                  )}
                </Box>
                
                <Box sx={{ mt: 2 }}>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleFileUpload}
                    disabled={!file || loading}
                    startIcon={loading ? <CircularProgress size={20} /> : <UploadIcon />}
                  >
                    {loading ? 'Uploading...' : 'Upload & Analyze'}
                  </Button>
                </Box>
              </Grid>
            </Grid>
            
            {error && (
              <Alert severity="error" sx={{ mt: 3 }}>
                {error}
              </Alert>
            )}
          </Paper>
        </Grid>
        
        {analysisResults && (
          <Grid item xs={12}>
            <AnalysisResults />
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default AnalysisPage;
