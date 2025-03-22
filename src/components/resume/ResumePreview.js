import React from 'react';
import { Box, Paper, Typography, Divider, Grid, Chip } from '@mui/material';

const ResumePreview = ({ resume }) => {
  // Default template is modern if not specified
  const template = resume.template || 'modern';
  
  // Different styling based on template
  const getTemplateStyles = () => {
    switch (template) {
      case 'modern':
        return {
          container: {
            display: 'flex',
            flexDirection: 'row',
            height: '100%',
          },
          sidebar: {
            width: '30%',
            bgcolor: '#f5f5f5',
            p: 3,
            borderRight: '1px solid #e0e0e0',
          },
          main: {
            width: '70%',
            p: 3,
          },
        };
      case 'classic':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
          header: {
            p: 3,
            borderBottom: '2px solid #333',
          },
          main: {
            p: 3,
          },
        };
      case 'minimal':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 3,
          },
          header: {
            mb: 2,
          },
          section: {
            mb: 2,
          },
        };
      case 'professional':
        return {
          container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
          },
          header: {
            p: 3,
            bgcolor: '#1976d2',
            color: 'white',
          },
          main: {
            p: 3,
          },
        };
      default:
        return {
          container: {
            display: 'flex',
            flexDirection: 'column',
            height: '100%',
            p: 3,
          },
        };
    }
  };
  
  const styles = getTemplateStyles();
  
  // Render different templates
  const renderTemplate = () => {
    switch (template) {
      case 'modern':
        return renderModernTemplate();
      case 'classic':
        return renderClassicTemplate();
      case 'minimal':
        return renderMinimalTemplate();
      case 'professional':
        return renderProfessionalTemplate();
      default:
        return renderModernTemplate();
    }
  };
  
  const renderModernTemplate = () => (
    <Box sx={styles.container}>
      <Box sx={styles.sidebar}>
        <Box sx={{ mb: 3, textAlign: 'center' }}>
          <Typography variant="h5" gutterBottom>
            {resume.personal_info.first_name} {resume.personal_info.last_name}
          </Typography>
        </Box>
        
        <Box sx={{ mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Contact
          </Typography>
          <Divider sx={{ mb: 1 }} />
          
          {resume.personal_info.email && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              Email: {resume.personal_info.email}
            </Typography>
          )}
          
          {resume.personal_info.phone && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              Phone: {resume.personal_info.phone}
            </Typography>
          )}
          
          {resume.personal_info.address && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              Address: {resume.personal_info.address}
            </Typography>
          )}
          
          {resume.personal_info.linkedin && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              LinkedIn: {resume.personal_info.linkedin}
            </Typography>
          )}
          
          {resume.personal_info.website && (
            <Typography variant="body2" sx={{ mb: 1 }}>
              Website: {resume.personal_info.website}
            </Typography>
          )}
        </Box>
        
        <Box>
          <Typography variant="h6" gutterBottom>
            Skills
          </Typography>
          <Divider sx={{ mb: 1 }} />
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
            {resume.skills.map((skill, index) => (
              <Chip key={index} label={skill} size="small" />
            ))}
          </Box>
        </Box>
      </Box>
      
      <Box sx={styles.main}>
        {resume.summary && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Professional Summary
            </Typography>
            <Divider sx={{ mb: 1 }} />
            <Typography variant="body1">
              {resume.summary}
            </Typography>
          </Box>
        )}
        
        {resume.experience.length > 0 && (
          <Box sx={{ mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Experience
            </Typography>
            <Divider sx={{ mb: 1 }} />
            
            {resume.experience.map((exp, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {exp.position}
                </Typography>
                <Typography variant="subtitle2">
                  {exp.company}{exp.location ? `, ${exp.location}` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {exp.start_date} - {exp.current ? 'Present' : exp.end_date}
                </Typography>
                <Typography variant="body2">
                  {exp.description}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
        
        {resume.education.length > 0 && (
          <Box>
            <Typography variant="h6" gutterBottom>
              Education
            </Typography>
            <Divider sx={{ mb: 1 }} />
            
            {resume.education.map((edu, index) => (
              <Box key={index} sx={{ mb: 2 }}>
                <Typography variant="subtitle1" fontWeight="bold">
                  {edu.degree}{edu.field_of_study ? ` in ${edu.field_of_study}` : ''}
                </Typography>
                <Typography variant="subtitle2">
                  {edu.institution}{edu.location ? `, ${edu.location}` : ''}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 1 }}>
                  {edu.start_date} - {edu.current ? 'Present' : edu.end_date}
                </Typography>
                <Typography variant="body2">
                  {edu.description}
                </Typography>
              </Box>
            ))}
          </Box>
        )}
      </Box>
    </Box>
  );
  
  // Other template rendering functions would be implemented similarly
  // For brevity, I'm only implementing the modern template in detail
  
  const renderClassicTemplate = () => (
    <Box sx={styles.container}>
      <Box sx={styles.header}>
        <Typography variant="h4" align="center" gutterBottom>
          {resume.personal_info.first_name} {resume.personal_info.last_name}
        </Typography>
        
        <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 1 }}>
          {resume.personal_info.email && (
            <Typography variant="body2">
              {resume.personal_info.email}
            </Typography>
          )}
          
          {resume.personal_info.phone && (
            <Typography variant="body2">
              {resume.personal_info.phone}
            </Typography>
          )}
          
          {resume.personal_info.linkedin && (
            <Typography variant="body2">
              {resume.personal_info.linkedin}
            </Typography>
          )}
        </Box>
      </Box>
      
      <Box sx={styles.main}>
        {/* Content would be similar to modern template but with different styling */}
        <Typography variant="body2" color="text.secondary">
          Classic template preview (simplified for demo)
        </Typography>
      </Box>
    </Box>
  );
  
  const renderMinimalTemplate = () => (
    <Box sx={styles.container}>
      {/* Minimal template content */}
      <Typography variant="body2" color="text.secondary">
        Minimal template preview (simplified for demo)
      </Typography>
    </Box>
  );
  
  const renderProfessionalTemplate = () => (
    <Box sx={styles.container}>
      {/* Professional template content */}
      <Typography variant="body2" color="text.secondary">
        Professional template preview (simplified for demo)
      </Typography>
    </Box>
  );
  
  return (
    <Paper 
      elevation={3} 
      sx={{ 
        height: '100%', 
        minHeight: '842px', // A4 height in pixels at 96 DPI
        width: '100%',
        overflow: 'hidden',
      }}
    >
      {renderTemplate()}
    </Paper>
  );
};

export default ResumePreview;