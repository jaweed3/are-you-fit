import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  Box, Typography, TextField, Grid, Button, IconButton, 
  Card, CardContent, CardActions, Divider, Chip
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

const experienceValidationSchema = Yup.object({
  title: Yup.string().required('Job title is required'),
  company: Yup.string().required('Company name is required'),
  start_date: Yup.string().required('Start date is required'),
  end_date: Yup.string(),
  location: Yup.string(),
  responsibilities: Yup.array().of(Yup.string())
});

const ExperienceForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const [editIndex, setEditIndex] = useState(-1);
  const [newResponsibility, setNewResponsibility] = useState('');
  
  const initialValues = {
    experience: resumeData.experience || [],
    currentExperience: {
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      responsibilities: []
    }
  };
  
  const handleAddExperience = (values, { resetForm, setFieldValue }) => {
    const updatedExperience = [...values.experience];
    
    if (editIndex >= 0) {
      // Update existing experience
      updatedExperience[editIndex] = values.currentExperience;
      setEditIndex(-1);
    } else {
      // Add new experience
      updatedExperience.push(values.currentExperience);
    }
    
    updateResumeData({ experience: updatedExperience });
    
    // Reset the form
    setFieldValue('currentExperience', {
      title: '',
      company: '',
      location: '',
      start_date: '',
      end_date: '',
      responsibilities: []
    });
  };
  
  const handleEditExperience = (index, formikProps) => {
    setEditIndex(index);
    formikProps.setFieldValue('currentExperience', resumeData.experience[index]);
  };
  
  const handleDeleteExperience = (index) => {
    const updatedExperience = [...resumeData.experience];
    updatedExperience.splice(index, 1);
    updateResumeData({ experience: updatedExperience });
    
    if (editIndex === index) {
      setEditIndex(-1);
    }
  };
  
  const handleAddResponsibility = (formikProps) => {
    if (newResponsibility.trim()) {
      const currentResponsibilities = formikProps.values.currentExperience.responsibilities || [];
      formikProps.setFieldValue('currentExperience.responsibilities', [
        ...currentResponsibilities,
        newResponsibility.trim()
      ]);
      setNewResponsibility('');
    }
  };
  
  const handleDeleteResponsibility = (index, formikProps) => {
    const updatedResponsibilities = [...formikProps.values.currentExperience.responsibilities];
    updatedResponsibilities.splice(index, 1);
    formikProps.setFieldValue('currentExperience.responsibilities', updatedResponsibilities);
  };
  
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Work Experience
      </Typography>
      
      <Formik
        initialValues={initialValues}
        onSubmit={handleAddExperience}
        enableReinitialize
      >
        {(formikProps) => (
          <Form>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="title"
                  name="currentExperience.title"
                  label="Job Title"
                  value={formikProps.values.currentExperience.title}
                  onChange={formikProps.handleChange}
                  error={
                    formikProps.touched.currentExperience?.title && 
                    Boolean(formikProps.errors.currentExperience?.title)
                  }
                  helperText={
                    formikProps.touched.currentExperience?.title && 
                    formikProps.errors.currentExperience?.title
                  }
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="company"
                  name="currentExperience.company"
                  label="Company"
                  value={formikProps.values.currentExperience.company}
                  onChange={formikProps.handleChange}
                  error={
                    formikProps.touched.currentExperience?.company && 
                    Boolean(formikProps.errors.currentExperience?.company)
                  }
                  helperText={
                    formikProps.touched.currentExperience?.company && 
                    formikProps.errors.currentExperience?.company
                  }
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="location"
                  name="currentExperience.location"
                  label="Location"
                  value={formikProps.values.currentExperience.location}
                  onChange={formikProps.handleChange}
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="start_date"
                  name="currentExperience.start_date"
                  label="Start Date"
                  value={formikProps.values.currentExperience.start_date}
                  onChange={formikProps.handleChange}
                  error={
                    formikProps.touched.currentExperience?.start_date && 
                    Boolean(formikProps.errors.currentExperience?.start_date)
                  }
                  helperText={
                    formikProps.touched.currentExperience?.start_date && 
                    formikProps.errors.currentExperience?.start_date
                  }
                  placeholder="MM/YYYY"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="end_date"
                  name="currentExperience.end_date"
                  label="End Date"
                  value={formikProps.values.currentExperience.end_date}
                  onChange={formikProps.handleChange}
                  placeholder="MM/YYYY or Present"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Typography variant="subtitle1" gutterBottom>
                  Responsibilities
                </Typography>
                
                <Box sx={{ display: 'flex', mb: 2 }}>
                  <TextField
                    fullWidth
                    label="Add Responsibility"
                    value={newResponsibility}
                    onChange={(e) => setNewResponsibility(e.target.value)}
                    onKeyPress={(e) => {
                      if (e.key === 'Enter') {
                        e.preventDefault();
                        handleAddResponsibility(formikProps);
                      }
                    }}
                  />
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={() => handleAddResponsibility(formikProps)}
                    sx={{ ml: 1 }}
                  >
                    Add
                  </Button>
                </Box>
                
                <Box sx={{ mb: 2 }}>
                  {formikProps.values.currentExperience.responsibilities?.map((responsibility, index) => (
                    <Chip
                      key={index}
                      label={responsibility}
                      onDelete={() => handleDeleteResponsibility(index, formikProps)}
                      sx={{ m: 0.5 }}
                    />
                  ))}
                </Box>
              </Grid>
              
              <Grid item xs={12}>
                <Button
                  type="submit"
                  variant="contained"
                  color="primary"
                  startIcon={editIndex >= 0 ? <EditIcon /> : <AddIcon />}
                >
                  {editIndex >= 0 ? 'Update Experience' : 'Add Experience'}
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="h6" gutterBottom>
          Added Experience
        </Typography>
        
        {resumeData.experience && resumeData.experience.length > 0 ? (
          resumeData.experience.map((exp, index) => (
            <Card key={index} sx={{ mb: 2 }}>
              <CardContent>
                <Typography variant="h6">
                  {exp.title}
                </Typography>
                <Typography variant="subtitle1" color="text.secondary">
                  {exp.company} {exp.location ? `• ${exp.location}` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {exp.start_date} - {exp.end_date || 'Present'}
                </Typography>
                
                {exp.responsibilities && exp.responsibilities.length > 0 && (
                  <Box sx={{ mt: 2 }}>
                    <Typography variant="subtitle2">
                      Responsibilities:
                    </Typography>
                    <ul style={{ paddingLeft: '20px', margin: '8px 0' }}>
                      {exp.responsibilities.map((resp, respIndex) => (
                        <li key={respIndex}>
                          <Typography variant="body2">{resp}</Typography>
                        </li>
                      ))}
                    </ul>
                  </Box>
                )}
              </CardContent>
              <CardActions>
                <Button 
                  size="small" 
                  startIcon={<EditIcon />}
                  onClick={() => handleEditExperience(index, formikProps)}
                >
                  Edit
                </Button>
                <Button 
                  size="small" 
                  color="error" 
                  startIcon={<DeleteIcon />}
                  onClick={() => handleDeleteExperience(index)}
                >
                  Delete
                </Button>
              </CardActions>
            </Card>
          ))
        ) : (
          <Typography variant="body2" color="text.secondary">
            No experience added yet.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

export default ExperienceForm;