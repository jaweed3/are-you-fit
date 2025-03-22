import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  Box, Typography, TextField, Paper, 
  List, ListItem, ListItemIcon, ListItemText 
} from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const SummaryForm = () => {
  const { resumeData, updateResumeData } = useResume();
  
  const handleSummaryChange = (e) => {
    updateResumeData({ summary: e.target.value });
  };
  
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Professional Summary
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Your professional summary is a brief statement that highlights your experience, skills, and achievements.
          It's often the first thing employers read, so make it compelling.
        </Typography>
      </Box>
      
      <TextField
        fullWidth
        id="summary"
        name="summary"
        label="Professional Summary"
        multiline
        rows={6}
        value={resumeData.summary || ''}
        onChange={handleSummaryChange}
        placeholder="Write a brief summary of your professional background, key skills, and career goals..."
      />
      
      <Paper variant="outlined" sx={{ mt: 4, p: 2 }}>
        <Typography variant="subtitle1" gutterBottom>
          Tips for a Strong Summary
        </Typography>
        
        <List dense>
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Keep it concise" 
              secondary="Aim for 3-5 sentences that highlight your most relevant qualifications."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Tailor it to the job" 
              secondary="Customize your summary to match the specific job you're applying for."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Include keywords" 
              secondary="Incorporate relevant keywords from the job description to pass ATS screening."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Highlight achievements" 
              secondary="Mention specific accomplishments rather than just responsibilities."
            />
          </ListItem>
          
          <ListItem>
            <ListItemIcon>
              <CheckCircleOutlineIcon color="primary" />
            </ListItemIcon>
            <ListItemText 
              primary="Show your value" 
              secondary="Explain how your skills and experience can benefit the employer."
            />
          </ListItem>
        </List>
      </Paper>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Example Summary
        </Typography>
        
        <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
          <Typography variant="body2" fontStyle="italic">
            "Results-driven software engineer with 5+ years of experience developing web applications using React and Node.js. 
            Specialized in creating responsive, user-friendly interfaces and optimizing application performance. 
            Successfully delivered 10+ projects on time and under budget, reducing load times by an average of 40%. 
            Seeking to leverage my technical expertise and collaborative skills to create innovative solutions at [Company Name]."
          </Typography>
        </Paper>
      </Box>
    </Box>
  );
};

export default SummaryForm;