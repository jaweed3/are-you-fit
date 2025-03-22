import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  Box, Typography, Grid, TextField, 
  Divider, Paper
} from '@mui/material';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const personalInfoValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Enter a valid email').required('Email is required'),
  phone: Yup.string().required('Phone number is required'),
  job_title: Yup.string().required('Job title is required'),
});

const PersonalInfoForm = () => {
  const { resumeData, updateResumeData } = useResume();
  
  const initialValues = {
    name: resumeData.personal_info?.name || '',
    email: resumeData.personal_info?.email || '',
    phone: resumeData.personal_info?.phone || '',
    job_title: resumeData.personal_info?.job_title || '',
    location: resumeData.personal_info?.location || '',
    linkedin: resumeData.personal_info?.linkedin || '',
    website: resumeData.personal_info?.website || '',
    github: resumeData.personal_info?.github || '',
  };
  
  const handleSubmit = (values) => {
    updateResumeData({
      ...resumeData,
      personal_info: values
    });
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Personal Information
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This information will appear at the top of your resume.
      </Typography>
      
      <Formik
        initialValues={initialValues}
        validationSchema={personalInfoValidationSchema}
        onSubmit={handleSubmit}
        enableReinitialize
      >
        {({ values, errors, touched, handleChange, handleBlur, handleSubmit }) => (
          <Form onChange={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="name"
                  name="name"
                  label="Full Name"
                  value={values.name}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.name && Boolean(errors.name)}
                  helperText={touched.name && errors.name}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="job_title"
                  name="job_title"
                  label="Job Title"
                  value={values.job_title}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.job_title && Boolean(errors.job_title)}
                  helperText={touched.job_title && errors.job_title}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="email"
                  name="email"
                  label="Email"
                  value={values.email}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="phone"
                  name="phone"
                  label="Phone"
                  value={values.phone}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.phone && Boolean(errors.phone)}
                  helperText={touched.phone && errors.phone}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="location"
                  name="location"
                  label="Location"
                  placeholder="City, State, Country"
                  value={values.location}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.location && Boolean(errors.location)}
                  helperText={touched.location && errors.location}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle1" gutterBottom>
                  Online Presence (Optional)
                </Typography>
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="linkedin"
                  name="linkedin"
                  label="LinkedIn URL"
                  value={values.linkedin}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.linkedin && Boolean(errors.linkedin)}
                  helperText={touched.linkedin && errors.linkedin}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12} sm={6}>
                <TextField
                  fullWidth
                  id="github"
                  name="github"
                  label="GitHub URL"
                  value={values.github}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.github && Boolean(errors.github)}
                  helperText={touched.github && errors.github}
                  margin="normal"
                />
              </Grid>
              
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="website"
                  name="website"
                  label="Personal Website"
                  value={values.website}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  error={touched.website && Boolean(errors.website)}
                  helperText={touched.website && errors.website}
                  margin="normal"
                />
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </Box>
  );
};

export default PersonalInfoForm;