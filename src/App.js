import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import theme from './theme';

// Context Providers
import { AuthProvider } from './context/AuthContext';
import { ResumeProvider } from './context/ResumeContext';

// Components
import Layout from './components/layout/Layout';
import ProtectedRoute from './components/auth/ProtectedRoute';

// Pages
import HomePage from './pages/HomePage';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ForgotPasswordPage from './pages/ForgotPasswordPage';
import DashboardPage from './pages/DashboardPage';
import ResumesPage from './pages/ResumesPage';
import ResumeEditPage from './pages/ResumeEditPage';
import ResumePreviewPage from './pages/ResumePreviewPage';
import JobMatchPage from './pages/JobMatchPage';
import AnalysisPage from './pages/AnalysisPage';
import ProfilePage from './pages/ProfilePage';
import NotFoundPage from './pages/NotFoundPage';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <ResumeProvider>
          <Router>
            <Layout>
              <Routes>
                {/* Public routes */}
                <Route path="/" element={<HomePage />} />
                <Route path="/login" element={<LoginPage />} />
                <Route path="/register" element={<RegisterPage />} />
                <Route path="/forgot-password" element={<ForgotPasswordPage />} />
                
                {/* Protected routes */}
                <Route 
                  path="/dashboard" 
                  element={
                    <ProtectedRoute>
                      <DashboardPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/resumes" 
                  element={
                    <ProtectedRoute>
                      <ResumesPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/resume/edit" 
                  element={
                    <ProtectedRoute>
                      <ResumeEditPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/resume/edit/:id" 
                  element={
                    <ProtectedRoute>
                      <ResumeEditPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/resume/preview/:id" 
                  element={
                    <ProtectedRoute>
                      <ResumePreviewPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/job-match" 
                  element={
                    <ProtectedRoute>
                      <JobMatchPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/analysis" 
                  element={
                    <ProtectedRoute>
                      <AnalysisPage />
                    </ProtectedRoute>
                  } 
                />
                <Route 
                  path="/profile" 
                  element={
                    <ProtectedRoute>
                      <ProfilePage />
                    </ProtectedRoute>
                  } 
                />
                
                {/* 404 route */}
                <Route path="*" element={<NotFoundPage />} />
              </Routes>
            </Layout>
          </Router>
        </ResumeProvider>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;