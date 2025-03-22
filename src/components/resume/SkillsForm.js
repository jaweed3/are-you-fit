import React, { useState } from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  Box, Typography, TextField, Button, Chip, 
  Paper, Divider, Grid, Autocomplete
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

// Common skills suggestions
const commonSkills = [
  // Programming Languages
  'JavaScript', 'Python', 'Java', 'C++', 'C#', 'PHP', 'Ruby', 'Swift', 'Go', 'Kotlin',
  // Web Technologies
  'HTML', 'CSS', 'React', 'Angular', 'Vue.js', 'Node.js', 'Express.js', 'Django', 'Flask',
  // Databases
  'SQL', 'MySQL', 'PostgreSQL', 'MongoDB', 'Oracle', 'SQLite', 'Redis',
  // Cloud & DevOps
  'AWS', 'Azure', 'Google Cloud', 'Docker', 'Kubernetes', 'Jenkins', 'Git', 'GitHub', 'GitLab',
  // Data Science
  'Machine Learning', 'Data Analysis', 'TensorFlow', 'PyTorch', 'Pandas', 'NumPy', 'R',
  // Soft Skills
  'Communication', 'Teamwork', 'Problem Solving', 'Leadership', 'Time Management', 'Adaptability'
];

const SkillsForm = () => {
  const { resumeData, updateResumeData } = useResume();
  const [newSkill, setNewSkill] = useState('');
  const [skills, setSkills] = useState(resumeData.skills || []);
  
  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      const updatedSkills = [...skills, newSkill.trim()];
      setSkills(updatedSkills);
      updateResumeData({ skills: updatedSkills });
      setNewSkill('');
    }
  };
  
  const handleDeleteSkill = (skillToDelete) => {
    const updatedSkills = skills.filter(skill => skill !== skillToDelete);
    setSkills(updatedSkills);
    updateResumeData({ skills: updatedSkills });
  };
  
  const handleSkillSelect = (event, value) => {
    if (value && !skills.includes(value)) {
      const updatedSkills = [...skills, value];
      setSkills(updatedSkills);
      updateResumeData({ skills: updatedSkills });
      setNewSkill('');
    }
  };
  
  return (
    <Box sx={{ mt: 2 }}>
      <Typography variant="h6" gutterBottom>
        Skills
      </Typography>
      
      <Box sx={{ mb: 3 }}>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Add your technical and soft skills. These are crucial for ATS systems to match you with job requirements.
        </Typography>
      </Box>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Autocomplete
            freeSolo
            options={commonSkills.filter(skill => !skills.includes(skill))}
            value={newSkill}
            onChange={handleSkillSelect}
            onInputChange={(event, value) => setNewSkill(value)}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Add Skill"
                fullWidth
                onKeyPress={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    handleAddSkill();
                  }
                }}
              />
            )}
          />
        </Grid>
        
        <Grid item xs={12}>
          <Button
            variant="contained"
            color="primary"
            startIcon={<AddIcon />}
            onClick={handleAddSkill}
            disabled={!newSkill.trim()}
          >
            Add Skill
          </Button>
        </Grid>
      </Grid>
      
      <Paper 
        variant="outlined" 
        sx={{ 
          mt: 3, 
          p: 2, 
          display: 'flex', 
          flexWrap: 'wrap', 
          minHeight: '100px',
          alignContent: 'flex-start'
        }}
      >
        {skills.length > 0 ? (
          skills.map((skill, index) => (
            <Chip
              key={index}
              label={skill}
              onDelete={() => handleDeleteSkill(skill)}
              sx={{ m: 0.5 }}
            />
          ))
        ) : (
          <Typography variant="body2" color="text.secondary" sx={{ p: 2 }}>
            No skills added yet. Add your skills to improve your resume.
          </Typography>
        )}
      </Paper>
      
      <Box sx={{ mt: 4 }}>
        <Typography variant="subtitle1" gutterBottom>
          Skill Categories
        </Typography>
        <Typography variant="body2" color="text.secondary" gutterBottom>
          Consider including skills from these categories:
        </Typography>
        
        <Grid container spacing={2} sx={{ mt: 1 }}>
          <Grid item xs={12} sm={6} md={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Technical Skills
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Programming languages, frameworks, tools, databases, etc.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Soft Skills
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Communication, teamwork, problem-solving, leadership, etc.
              </Typography>
            </Paper>
          </Grid>
          
          <Grid item xs={12} sm={6} md={4}>
            <Paper variant="outlined" sx={{ p: 2 }}>
              <Typography variant="subtitle2" gutterBottom>
                Industry-Specific Skills
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Skills specific to your industry or target job.
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};

export default SkillsForm;