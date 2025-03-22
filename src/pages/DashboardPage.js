import React, { useEffect, useState } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Container,
  Grid,
  Paper,
  Typography,
  Button,
  Box,
  Card,
  CardContent,
  CardActions,
  Divider,
  List,
  ListItem,
  ListItemText,
  Skeleton,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DescriptionIcon from '@mui/icons-material/Description';
import WorkIcon from '@mui/icons-material/Work';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { useAuth } from '../context/AuthContext';
import { resumeService } from '../services/api';

const DashboardPage = () => {
  const { currentUser } = useAuth();
  const [stats, setStats] = useState({
    resumeCount: 0,
    recentResumes: [],
    loading: true,
  });
  
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        const resumesResponse = await resumeService.getResumes();
        
        setStats({
          resumeCount: resumesResponse.data.length,
          recentResumes: resumesResponse.data.slice(0, 3),
          loading: false,
        });
      } catch (error) {
        console.error('Error fetching dashboard data:', error);
        setStats(prev => ({ ...prev, loading: false }));
      }
    };
    
    fetchDashboardData();
  }, []);
  
  return (
    <Container maxWidth="lg">
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Dashboard
        </Typography>
        <Typography variant="body1" color="text.secondary">
          Welcome back, {currentUser?.name || 'User'}!
        </Typography>
      </Box>
      
      <Grid container spacing={3}>
        {/* Quick Actions */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Quick Actions
            </Typography>
            <Divider sx={{ mb: 2 }} />
            <List>
              <ListItem 
                button 
                component={RouterLink} 
                to="/resume/edit"
                sx={{ borderRadius: 1, mb: 1 }}
              >
                <ListItemText 
                  primary="Create New Resume" 
                  secondary="Start building a professional resume"
                />
                <AddIcon color="primary" />
              </ListItem>
              <ListItem 
                button 
                component={RouterLink} 
                to="/job-match"
                sx={{ borderRadius: 1, mb: 1 }}
              >
                <ListItemText 
                  primary="Job Match Analysis" 
                  secondary="Compare your resume to job descriptions"
                />
                <WorkIcon color="primary" />
              </ListItem>
              <ListItem 
                button 
                component={RouterLink} 
                to="/analysis"
                sx={{ borderRadius: 1 }}
              >
                <ListItemText 
                  primary="Resume Analysis" 
                  secondary="Get feedback to improve your resume"
                />
                <AnalyticsIcon color="primary" />
              </ListItem>
            </List>
          </Paper>
        </Grid>
        
        {/* Resume Stats */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6">
                Your Resumes
              </Typography>
              <Button 
                variant="outlined" 
                startIcon={<DescriptionIcon />}
                component={RouterLink}
                to="/resumes"
              >
                View All
              </Button>
            </Box>
            <Divider sx={{ mb: 2 }} />
            
            {stats.loading ? (
              <Grid container spacing={2}>
                {[1, 2, 3].map((item) => (
                  <Grid item xs={12} key={item}>
                    <Skeleton variant="rectangular" height={100} />
                  </Grid>
                ))}
              </Grid>
            ) : stats.resumeCount === 0 ? (
              <Box sx={{ textAlign: 'center', py: 4 }}>
                <Typography variant="body1" paragraph>
                  You haven't created any resumes yet.
                </Typography>
                <Button
                  variant="contained"
                  startIcon={<AddIcon />}
                  component={RouterLink}
                  to="/resume/edit"
                >
                  Create Your First Resume
                </Button>
              </Box>
            ) : (
              <>
                <Grid container spacing={2}>
                  {stats.recentResumes.map((resume) => (
                    <Grid item xs={12} key={resume.id}>
                      <Card variant="outlined">
                        <CardContent>
                          <Typography variant="h6">
                            {resume.name}
                          </Typography>
                          <Typography variant="body2" color="text.secondary">
                            Last updated: {new Date(resume.updated_at).toLocaleDateString()}
                          </Typography>
                        </CardContent>
                        <CardActions>
                          <Button 
                            size="small" 
                            component={RouterLink} 
                            to={`/resume/edit/${resume.id}`}
                          >
                            Edit
                          </Button>
                          <Button 
                            size="small" 
                            component={RouterLink} 
                            to={`/resume/preview/${resume.id}`}
                          >
                            Preview
                          </Button>
                        </CardActions>
                      </Card>
                    </Grid>
                  ))}
                </Grid>
                
                {stats.resumeCount > 3 && (
                  <Box sx={{ textAlign: 'center', mt: 2 }}>
                    <Button 
                      component={RouterLink} 
                      to="/resumes"
                    >
                      View All ({stats.resumeCount}) Resumes
                    </Button>
                  </Box>
                )}
              </>
            )}
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardPage;