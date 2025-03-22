import React from 'react';
import {
  Box,
  Typography,
  Divider,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActionArea,
  Radio,
} from '@mui/material';
import { useResume } from '../../context/ResumeContext';

// Template preview images (you would replace these with actual images)
import modernTemplate from '../../assets/templates/modern.png';
import classicTemplate from '../../assets/templates/classic.png';
import minimalTemplate from '../../assets/templates/minimal.png';
import professionalTemplate from '../../assets/templates/professional.png';

const templates = [
  {
    id: 'modern',
    name: 'Modern',
    description: 'Clean and contemporary design with a sidebar for skills and contact info.',
    image: modernTemplate,
  },
  {
    id: 'classic',
    name: 'Classic',
    description: 'Traditional resume layout with a professional and timeless feel.',
    image: classicTemplate,
  },
  {
    id: 'minimal',
    name: 'Minimal',
    description: 'Simple and elegant design focusing on content with minimal styling.',
    image: minimalTemplate,
  },
  {
    id: 'professional',
    name: 'Professional',
    description: 'Structured layout with clear sections and a business-oriented style.',
    image: professionalTemplate,
  },
];

const TemplateSelection = () => {
  const { resumeData, setResumeData } = useResume();
  
  const handleTemplateChange = (templateId) => {
    setResumeData({
      ...resumeData,
      template: templateId,
    });
  };
  
  return (
    <Box>
      <Typography variant="h6" gutterBottom>
        Choose a Template
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Select a design template for your resume.
      </Typography>
      
      <Divider sx={{ mb: 3 }} />
      
      <Grid container spacing={3}>
        {templates.map((template) => (
          <Grid item xs={12} sm={6} key={template.id}>
            <Card 
              variant="outlined"
              sx={{ 
                border: resumeData.template === template.id ? '2px solid' : '1px solid',
                borderColor: resumeData.template === template.id ? 'primary.main' : 'divider',
              }}
            >
              <CardActionArea onClick={() => handleTemplateChange(template.id)}>
                <CardMedia
                  component="img"
                  height="200"
                  image={template.image}
                  alt={template.name}
                />
                <CardContent sx={{ display: 'flex', alignItems: 'flex-start' }}>
                  <Radio
                    checked={resumeData.template === template.id}
                    onChange={() => handleTemplateChange(template.id)}
                    value={template.id}
                    name="template-radio"
                    sx={{ mt: -1, ml: -1 }}
                  />
                  <Box>
                    <Typography variant="h6" component="div">
                      {template.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {template.description}
                    </Typography>
                  </Box>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default TemplateSelection;