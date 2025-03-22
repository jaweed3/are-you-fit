import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { useNavigate } from 'react-router-dom';
import { 
  Box, Typography, Stepper, Step, StepLabel, Button, 
  Paper, Container, Alert, CircularProgress
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CheckIcon from '@mui/icons-material/Check';
import { resumeService } from '../../services/api';

// Resume Form Components
import PersonalInfoForm from '../../components/resume/PersonalInfoForm';
import SummaryForm from '../../components/resume/SummaryForm';
import ExperienceForm from '../../components/resume/ExperienceForm';
import EducationForm from '../../components/resume/EducationForm';
import SkillsForm from '../../components/resume/SkillsForm';
import JobDescriptionInput from '../../components/job/JobDescriptionInput';
import AnalysisResults from '../../components/analysis/AnalysisResults';

const steps = [
  'Personal Info',
  'Summary',
  'Experience',
  'Education',
  'Skills',
  'Job Match',
  'Analysis'
];

const CreateResumePage = () => {
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
  const [activeStep, setActiveStep] = useState(0);
  const navigate = useNavigate();
  
  const handleNext = () => {
    setActiveStep((prevStep) => prevStep + 1);
  };
  
  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };
  
  const handleAnalyzeResume = async () => {
    if (!resumeData.personal_info || !resumeData.experience || resumeData.experience.length === 0) {
      setError('Please complete at least the Personal Info and Experience sections before analyzing.');
      return;
    }
    
    try {
      setLoading(true);
      setError(null);
      const response = await resumeService.analyzeResume(resumeData);
      setAnalysisResults(response.data);
      handleNext();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to analyze resume.');
      setLoading(false);
    }
  };
  
  const handleSaveResume = async () => {
    try {
      setLoading(true);
      setError(null);
      await resumeService.saveResume({
        ...resumeData,
        analysis_results: analysisResults
      });
      setLoading(false);
      navigate('/resume/list');
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to save resume.');
      setLoading(false);
    }
  };
  
  const getStepContent = (step) => {
    switch (step) {
      case 0:
        return <PersonalInfoForm />;
      case 1:
        return <SummaryForm />;
      case 2:
        return <ExperienceForm />;
      case 3:
        return <EducationForm />;
      case 4:
        return <SkillsForm />;
      case 5:
        return <JobDescriptionInput />;
      case 6:
        return <AnalysisResults />;
      default:
        return 'Unknown step';
    }
  };
  
  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: 4 }}>
        <Typography variant="h4" component="h1" gutterBottom align="center">
          Create Your Resume
        </Typography>
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4, mt: 2 }}>
          {steps.map((label) => (
            <Step key={label}>
              <StepLabel>{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Box>
          {getStepContent(activeStep)}
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              variant="outlined"
              onClick={handleBack}
              disabled={activeStep === 0 || loading}
              startIcon={<ArrowBackIcon />}
            >
              Back
            </Button>
            
            <Box>
              {activeStep === steps.length - 2 ? (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleAnalyzeResume}
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} /> : <CheckIcon />}
                >
                  {loading ? 'Analyzing...' : 'Analyze Resume'}
                </Button>
              ) : activeStep === steps.length - 1 ? (
                <Button
                  variant="contained"
                  color="success"
                  onClick={handleSaveResume}
                  disabled={loading}
                  endIcon={loading ? <CircularProgress size={20} /> : <CheckIcon />}
                >
                  {loading ? 'Saving...' : 'Save Resume'}
                </Button>
              ) : (
                <Button
                  variant="contained"
                  color="primary"
                  onClick={handleNext}
                  endIcon={<ArrowForwardIcon />}
                >
                  Next
                </Button>
              )}
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
};

export default CreateResumePage;