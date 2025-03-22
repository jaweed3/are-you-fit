import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Avatar,
  Divider,
  Alert,
  CircularProgress,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from '@mui/material';
import LockIcon from '@mui/icons-material/Lock';
import SaveIcon from '@mui/icons-material/Save';
import Layout from '../components/layout/Layout';
import { userService } from '../services/api';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';

const profileValidationSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
});

const passwordValidationSchema = Yup.object({
  current_password: Yup.string().required('Current password is required'),
  new_password: Yup.string()
    .min(8, 'Password must be at least 8 characters')
    .required('New password is required'),
  confirm_password: Yup.string()
    .oneOf([Yup.ref('new_password'), null], 'Passwords must match')
    .required('Confirm password is required'),
});

const ProfilePage = () => {
  const { currentUser, updateUser } = useAuth();
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [passwordDialogOpen, setPasswordDialogOpen] = useState(false);
  
  const handleUpdateProfile = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      const response = await userService.updateProfile({
        name: values.name,
        email: values.email,
      });
      
      updateUser(response.data);
      
      setSuccess('Profile updated successfully');
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to update profile. Please try again.');
      setLoading(false);
    } finally {
      setSubmitting(false);
    }
  };
  
  const handleChangePassword = async (values, { setSubmitting, resetForm }) => {
    try {
      setLoading(true);
      setError(null);
      setSuccess(null);
      
      await userService.changePassword({
        current_password: values.current_password,
        new_password: values.new_password,
      });
      
      setSuccess('Password changed successfully');
      setPasswordDialogOpen(false);
      resetForm();
      setLoading(false);
    } catch (err) {
      setError(err.response?.data?.detail || 'Failed to change password. Please try again.');
      setLoading(false);
    } finally {
      setSubmitting(false);
    }
  };
  
  if (!currentUser) {
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
    <Layout>
      <Container maxWidth="md">
        <Box sx={{ mb: 4 }}>
          <Typography variant="h4" component="h1" gutterBottom>
            Profile Settings
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Manage your account information and password
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}
        
        {success && (
          <Alert severity="success" sx={{ mb: 3 }}>
            {success}
          </Alert>
        )}
        
        <Paper sx={{ p: 4, mb: 4 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
            <Avatar
              sx={{
                width: 80,
                height: 80,
                bgcolor: 'primary.main',
                fontSize: 36,
                mr: 3,
              }}
            >
              {currentUser.name ? currentUser.name.charAt(0).toUpperCase() : 'U'}
            </Avatar>
            <Box>
              <Typography variant="h5">{currentUser.name}</Typography>
              <Typography variant="body2" color="text.secondary">
                {currentUser.email}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                Member since: {new Date(currentUser.created_at).toLocaleDateString()}
              </Typography>
            </Box>
          </Box>
          
          <Divider sx={{ my: 3 }} />
          
          <Typography variant="h6" gutterBottom>
            Account Information
          </Typography>
          
          <Formik
            initialValues={{
              name: currentUser.name || '',
              email: currentUser.email || '',
            }}
            validationSchema={profileValidationSchema}
            onSubmit={handleUpdateProfile}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
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
                      id="email"
                      name="email"
                      label="Email Address"
                      value={values.email}
                      onChange={handleChange}
                      onBlur={handleBlur}
                      error={touched.email && Boolean(errors.email)}
                      helperText={touched.email && errors.email}
                      margin="normal"
                    />
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || isSubmitting}
                    startIcon={loading ? <CircularProgress size={20} /> : <SaveIcon />}
                  >
                    Save Changes
                  </Button>
                </Box>
              </Form>
            )}
          </Formik>
        </Paper>
        
        <Paper sx={{ p: 4 }}>
          <Typography variant="h6" gutterBottom>
            Security
          </Typography>
          
          <Box sx={{ mt: 2 }}>
            <Button
              variant="outlined"
              color="primary"
              startIcon={<LockIcon />}
              onClick={() => setPasswordDialogOpen(true)}
            >
              Change Password
            </Button>
          </Box>
        </Paper>
        {/* Password Change Dialog */}
        <Dialog open={passwordDialogOpen} onClose={() => setPasswordDialogOpen(false)}>
          <DialogTitle>Change Password</DialogTitle>
          <Formik
            initialValues={{
              current_password: '',
              new_password: '',
              confirm_password: '',
            }}
            validationSchema={passwordValidationSchema}
            onSubmit={handleChangePassword}
          >
            {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
              <Form onSubmit={handleSubmit}>
                <DialogContent>
                  <DialogContentText>
                    To change your password, please enter your current password and then your new password.
                  </DialogContentText>
                  
                  <TextField
                    fullWidth
                    margin="normal"
                    id="current_password"
                    name="current_password"
                    label="Current Password"
                    type="password"
                    value={values.current_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.current_password && Boolean(errors.current_password)}
                    helperText={touched.current_password && errors.current_password}
                  />
                  
                  <TextField
                    fullWidth
                    margin="normal"
                    id="new_password"
                    name="new_password"
                    label="New Password"
                    type="password"
                    value={values.new_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.new_password && Boolean(errors.new_password)}
                    helperText={touched.new_password && errors.new_password}
                  />
                  
                  <TextField
                    fullWidth
                    margin="normal"
                    id="confirm_password"
                    name="confirm_password"
                    label="Confirm New Password"
                    type="password"
                    value={values.confirm_password}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    error={touched.confirm_password && Boolean(errors.confirm_password)}
                    helperText={touched.confirm_password && errors.confirm_password}
                  />
                </DialogContent>
                <DialogActions>
                  <Button onClick={() => setPasswordDialogOpen(false)}>Cancel</Button>
                  <Button
                    type="submit"
                    variant="contained"
                    color="primary"
                    disabled={loading || isSubmitting}
                  >
                    {loading ? <CircularProgress size={24} /> : 'Change Password'}
                  </Button>
                </DialogActions>
              </Form>
            )}
          </Formik>
        </Dialog>
      </Container>
    </Layout>
  );
};

export default ProfilePage;