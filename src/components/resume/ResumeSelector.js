import React from 'react';
import {
  Box,
  Typography,
  Paper,
  List,
  ListItem,
  ListItemText,
  ListItemButton,
  Divider,
  CircularProgress,
} from '@mui/material';
import { formatDistanceToNow } from 'date-fns';

const ResumeSelector = ({ resumes, selectedResumeId, onSelectResume, loading }) => {
  if (loading) {
    return (
      <Paper sx={{ p: 2, textAlign: 'center' }}>
        <CircularProgress size={24} />
        <Typography variant="body2" sx={{ mt: 1 }}>
          Loading resumes...
        </Typography>
      </Paper>
    );
  }
  
  if (resumes.length === 0) {
    return (
      <Paper sx={{ p: 2 }}>
        <Typography variant="body1" align="center">
          No resumes found. Create a new resume to get started.
        </Typography>
      </Paper>
    );
  }
  
  return (
    <Paper sx={{ mb: 3 }}>
      <Box sx={{ p: 2, bgcolor: 'primary.main', color: 'primary.contrastText' }}>
        <Typography variant="h6">
          Your Resumes
        </Typography>
      </Box>
      <Divider />
      <List sx={{ maxHeight: '400px', overflow: 'auto' }}>
        {resumes.map((resume) => (
          <ListItem key={resume.id} disablePadding divider>
            <ListItemButton
              selected={selectedResumeId === resume.id}
              onClick={() => onSelectResume(resume.id)}
            >
              <ListItemText
                primary={resume.name || 'Untitled Resume'}
                secondary={`Last updated ${formatDistanceToNow(new Date(resume.updated_at))} ago`}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Paper>
  );
};

export default ResumeSelector;