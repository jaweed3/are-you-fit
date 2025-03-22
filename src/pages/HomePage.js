import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Paper,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import DescriptionIcon from '@mui/icons-material/Description';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import WorkIcon from '@mui/icons-material/Work';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';
import { useAuth } from '../context/AuthContext';

const HomePage = () => {
  const { currentUser } = useAuth();
  
  return (
    <Box>
      {/* Hero Section */}
      <Box sx={{ bgcolor: 'primary.main', color: 'white', py: 8 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Typography variant="h3" component="h1" gutterBottom>
                Create Professional Resumes with AI
              </Typography>
              <Typography variant="h6" paragraph>
                Build, analyze, and optimize your resume to stand out in today's competitive job market.
              </Typography>
              <Box sx={{ mt: 4 }}>
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  component={RouterLink}
                  to={currentUser ? '/resumes' : '/register'}
                  sx={{ mr: 2 }}
                >
                  {currentUser ? 'My Resumes' : 'Get Started'}
                </Button>
                {!currentUser && (
                  <Button
                    variant="outlined"
                    color="inherit"
                    size="large"
                    component={RouterLink}
                    to="/login"
                  >
                    Sign In
                  </Button>
                )}
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box
                component="img"
                src="/images/resume-hero.svg"
                alt="Resume Builder"
                sx={{
                  width: '100%',
                  maxWidth: 500,
                  display: 'block',
                  mx: 'auto',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </Box>
      
      {/* Features Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography variant="h4" component="h2" align="center" gutterBottom>
          Key Features
        </Typography>
        <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
          Everything you need to create impressive resumes and land your dream job
        </Typography>
        
        <Grid container spacing={4} sx={{ mt: 4 }}>
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <DescriptionIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Professional Templates
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Choose from a variety of modern, ATS-friendly resume templates designed to impress recruiters.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <AnalyticsIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                AI-Powered Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get instant feedback and suggestions to improve your resume's content and structure.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
          <Paper sx={{ p: 3, height: '100%' }}>
              <AnalyticsIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                AI-Powered Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Get instant feedback and suggestions to improve your resume's content and structure.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <WorkIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Job Match Analysis
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Compare your resume to job descriptions and get tailored recommendations to increase your chances.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} md={3}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <CloudDownloadIcon color="primary" sx={{ fontSize: 40, mb: 2 }} />
              <Typography variant="h6" gutterBottom>
                Export Options
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Download your resume as PDF, Word, or plain text to use across different application platforms.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
      
      {/* How It Works Section */}
      <Box sx={{ bgcolor: 'background.default', py: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h4" component="h2" align="center" gutterBottom>
            How It Works
          </Typography>
          <Typography variant="subtitle1" align="center" color="text.secondary" paragraph>
            Create a professional resume in just a few simple steps
          </Typography>
          
          <Grid container spacing={4} sx={{ mt: 4 }}>
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}
                >
                  1
                </Box>
                <Typography variant="h6" gutterBottom>
                  Create Your Resume
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Fill in your details using our intuitive form or import from LinkedIn.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}
                >
                  2
                </Box>
                <Typography variant="h6" gutterBottom>
                  Analyze & Optimize
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Get AI-powered suggestions to improve your resume and match it to job descriptions.
                </Typography>
              </Box>
            </Grid>
            
            <Grid item xs={12} md={4}>
              <Box sx={{ textAlign: 'center' }}>
                <Box
                  sx={{
                    display: 'inline-flex',
                    borderRadius: '50%',
                    bgcolor: 'primary.main',
                    color: 'white',
                    width: 60,
                    height: 60,
                    justifyContent: 'center',
                    alignItems: 'center',
                    mb: 2,
                    fontSize: 24,
                    fontWeight: 'bold',
                  }}
                >
                  3
                </Box>
                <Typography variant="h6" gutterBottom>
                  Download & Apply
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Export your polished resume in your preferred format and start applying with confidence.
                </Typography>
              </Box>
            </Grid>
          </Grid>
          
          <Box sx={{ textAlign: 'center', mt: 6 }}>
            <Button
              variant="contained"
              size="large"
              component={RouterLink}
              to={currentUser ? '/resumes' : '/register'}
            >
              {currentUser ? 'Create Resume' : 'Get Started Now'}
            </Button>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default HomePage;
