import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useResume } from '../context/ResumeContext';
import {
  Container,
  Box,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Paper,
  CircularProgress,
  Alert,
  Divider,
  AppBar,
  Toolbar,
  IconButton,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import SaveIcon from '@mui/icons-material/Save';
import PreviewIcon from '@mui/icons-material/Preview';
import Layout from '../components/layout/Layout';
import PersonalInfoForm from '../components/resume/PersonalInfoForm';
import SummaryForm from '../components/resume/SummaryForm';
import ExperienceForm from '../components/resume/ExperienceForm';
import EducationForm from '../components/resume/EducationForm';
import SkillsForm from '../components/resume/SkillsForm';
import { resumeService } from '../services/api';

const steps = [
  'Personal Info',
  'Professional Summary',
  'Work Experience',
  'Education',
  'Skills',
];

const ResumeEditPage = () => {
  const { resumeData, updateResumeData, loading, setLoading, error, setError } = useResume();
  const navigate = useNavigate();
  
  const [activeStep, setActiveStep] = useState(0);
  const [saveStatus, setSaveStatus] = useState('');
  
  useEffect(() => {
    if (!resumeData || Object.keys(resumeData).length === 0) {
      navigate('/resumes');
    }
  }, [resumeData, navigate]);
  
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
    saveResume();
  };
  
  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };
  
  const handleStepClick = (step) => {
    setActiveStep(step);
  };
  
  const saveResume = async () => {
    if (!resumeData || !resumeData.id) return;
    
    try {
      setSaveStatus('saving');
      
      await resumeService.updateResume(resumeData.id, resumeData);
      
      setSaveStatus('saved');
      
      // Reset save status after 3 seconds
      setTimeout(() => {
        setSaveStatus('');
      }, 3000);
    } catch (err) {
      setError('Failed to save resume. Please try again.');
      setSaveStatus('error');
    }
  };
  
  const handlePreview = () => {
    saveResume();
    navigate(`/resume/preview/${resumeData.id}`);
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
      default:
        return 'Unknown step';
    }
  };
  
  if (!resumeData || Object.keys(resumeData).length === 0) {
    return (
      <Layout>
        <Container maxWidth="md">
          <Box sx={{ display: 'flex', justifyContent: 'center', py: 4 }}>
            <CircularProgress />
          </Box>
        </Container>
      </Layout>
    );
  }
  
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <AppBar position="sticky" color="default" elevation={0} sx={{ borderBottom: '1px solid', borderColor: 'divider' }}>
        <Toolbar>
          <IconButton edge="start" color="inherit" onClick={() => navigate('/resumes')} aria-label="back">
            <ArrowBackIcon />
          </IconButton>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1, ml: 2 }}>
            {resumeData.name || 'Edit Resume'}
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            {saveStatus === 'saving' && (
              <Box sx={{ display: 'flex', alignItems: 'center', mr: 2 }}>
                <CircularProgress size={20} sx={{ mr: 1 }} />
                <Typography variant="body2">Saving...</Typography>
              </Box>
            )}
            {saveStatus === 'saved' && (
              <Typography variant="body2" color="success.main" sx={{ mr: 2 }}>
                Saved
              </Typography>
            )}
            {saveStatus === 'error' && (
              <Typography variant="body2" color="error" sx={{ mr: 2 }}>
                Error saving
              </Typography>
            )}
            <Button 
              variant="outlined" 
              startIcon={<SaveIcon />} 
              onClick={saveResume}
              sx={{ mr: 1 }}
            >
              Save
            </Button>
            <Button 
              variant="contained" 
              color="primary" 
              startIcon={<PreviewIcon />}
              onClick={handlePreview}
            >
              Preview
            </Button>
          </Box>
        </Toolbar>
      </AppBar>
      
      <Container maxWidth="md" sx={{ mt: 4, mb: 8, flexGrow: 1 }}>
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        <Stepper activeStep={activeStep} alternativeLabel sx={{ mb: 4 }}>
          {steps.map((label, index) => (
            <Step key={label} completed={activeStep > index}>
              <StepLabel 
                onClick={() => handleStepClick(index)}
                sx={{ cursor: 'pointer' }}
              >
                {label}
              </StepLabel>
            </Step>
          ))}
        </Stepper>
        
        <Paper elevation={3} sx={{ p: 4 }}>
          {getStepContent(activeStep)}
          
          <Divider sx={{ my: 4 }} />
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button
              variant="outlined"
              disabled={activeStep === 0}
              onClick={handleBack}
            >
              Back
            </Button>
            <Button
              variant="contained"
              color="primary"
              onClick={activeStep === steps.length - 1 ? saveResume : handleNext}
            >
              {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default ResumeEditPage;