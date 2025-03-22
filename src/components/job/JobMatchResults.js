import React from 'react';
import {
  Box,
  Paper,
  Typography,
  Divider,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Chip,
  LinearProgress,
  Grid,
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import StarIcon from '@mui/icons-material/Star';
import SkillsIcon from '@mui/icons-material/Psychology';

const JobMatchResults = ({ results }) => {
  if (!results) return null;
  
  const getMatchColor = (score) => {
    if (score >= 80) return 'success';
    if (score >= 60) return 'warning';
    return 'error';
  };
  
  return (
    <Box>
      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h5" gutterBottom>
          Job Match Analysis
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <Typography variant="body1" sx={{ mr: 2 }}>
            Match Score:
          </Typography>
          <Chip 
            label={`${results.match_percentage}%`} 
            color={getMatchColor(results.match_percentage)}
            sx={{ fontWeight: 'bold' }}
          />
        </Box>
        
        <LinearProgress 
          variant="determinate" 
          value={results.match_percentage} 
          color={getMatchColor(results.match_percentage)}
          sx={{ height: 10, borderRadius: 5, mb: 3 }}
        />
        
        <Typography variant="body1" paragraph>
          {results.summary}
        </Typography>
      </Paper>
      
      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Matching Skills
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {results.matching_skills.map((skill, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={skill} />
                </ListItem>
              ))}
              
              {results.matching_skills.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No direct skill matches found.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Missing Skills
            </Typography>
            <Divider sx={{ mb: 2 }} />
            
            <List>
              {results.missing_skills.map((skill, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ErrorIcon color="error" />
                  </ListItemIcon>
                  <ListItemText primary={skill} />
                </ListItem>
              ))}
              
              {results.missing_skills.length === 0 && (
                <Typography variant="body2" color="text.secondary">
                  No missing skills identified.
                </Typography>
              )}
            </List>
          </Paper>
        </Grid>
      </Grid>
      
      <Paper sx={{ p: 3, mt: 3 }}>
        <Typography variant="h6" gutterBottom>
          Recommendations
        </Typography>
        <Divider sx={{ mb: 2 }} />
        
        <List>
          {results.recommendations.map((recommendation, index) => (
            <ListItem key={index}>
              <ListItemIcon>
                <StarIcon color="primary" />
              </ListItemIcon>
              <ListItemText primary={recommendation} />
            </ListItem>
          ))}
        </List>
      </Paper>
    </Box>
  );
};

export default JobMatchResults;