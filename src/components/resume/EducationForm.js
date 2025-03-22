import React, { useState } from 'react';
import {
  Box,
  Typography,
  Divider,
  Button,
  List,
  Card,
  CardContent,
  CardActions,
  TextField,
  Grid,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { useResume } from '../../context/ResumeContext';

const EducationForm = () => {
  const { resumeData, addEducation, updateEducation, removeEducation } = useResume();
  
  const [open, setOpen] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [formData, setFormData] = useState({
    institution: '',
    degree: '',
    field_of_study: '',
    location: '',
    start_date: '',
    end_date: '',
    current: false,
    description: '',
  });
  
  const handleOpen = () => {
    setFormData({
      institution: '',
      degree: '',
      field_of_study: '',
      location: '',
      start_date: '',
      end_date: '',
      current: false,
      description: '',
    });
    setEditIndex(null);
    setOpen(true);
  };
  
  const handleEdit = (index) => {
    setFormData(resumeData.education[index]);
    setEditIndex(index);
    setOpen(true);
  };
  
  const handleClose = () => {
    setOpen(false);
  };
  
  const handleChange = (e) => {
    const { name, value, checked, type } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };
  
  const handleSubmit = () => {
    if (editIndex !== null) {
      updateEducation(editIndex, formData);
    } else {
      addEducation(formData);
    }
    handleClose();
  };
  
  const handleDelete = (index) => {
    removeEducation(index);
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Education
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Add your educational background, starting with your most recent degree.
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Button
        variant="contained"
        startIcon={<AddIcon />}
        onClick={handleOpen}
        sx={{ mb: 3 }}
      >
        Add Education
      </Button>
      
      <List>
        {resumeData.education.map((edu, index) => (
          <Card key={index} variant="outlined" sx={{ mb: 2 }}>
            <CardContent>
              <Typography variant="h6">
                {edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}
              </Typography>
              <Typography variant="subtitle1">
                {edu.institution}{edu.location ? `, ${edu.location}` : ''}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
              </Typography>
              <Typography variant="body2" sx={{ mt: 1 }}>
                {edu.description}
              </Typography>
            </CardContent>
            <CardActions>
              <IconButton onClick={() => handleEdit(index)} size="small">
                <EditIcon />
              </IconButton>
              <IconButton onClick={() => handleDelete(index)} size="small">
                <DeleteIcon />
              </IconButton>
            </CardActions>
          </Card>
        ))}
      </List>
      
      <Dialog open={open} onClose={handleClose} maxWidth="md" fullWidth>
        <DialogTitle>
          {editIndex !== null ? 'Edit Education' : 'Add Education'}
        </DialogTitle>
        <DialogContent>
          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Institution"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Degree"
                name="degree"
                value={formData.degree}
                onChange={handleChange}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Field of Study"
                name="field_of_study"
                value={formData.field_of_study}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Location"
                name="location"
                value={formData.location}
                onChange={handleChange}
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Start Date"
                name="start_date"
                type="month"
                value={formData.start_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                required
              />
            </Grid>
            
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="End Date"
                name="end_date"
                type="month"
                value={formData.end_date}
                onChange={handleChange}
                InputLabelProps={{ shrink: true }}
                disabled={formData.current}
                required={!formData.current}
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                multiline
                rows={4}
                placeholder="Describe your studies, achievements, or relevant coursework"
              />
            </Grid>
          </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleSubmit} variant="contained">
            {editIndex !== null ? 'Update' : 'Add'}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
};

export default EducationForm;