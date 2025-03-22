import React from 'react';
import { useResume } from '../../context/ResumeContext';
import { 
  Box, Typography, Paper, Grid, Divider, 
  LinearProgress, Chip, List, ListItem, 
  ListItemText, ListItemIcon, Card, CardContent,
  Button, Alert
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorIcon from '@mui/icons-material/Error';
import WarningIcon from '@mui/icons-material/Warning';
import ThumbUpIcon from '@mui/icons-material/ThumbUp';
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, Tooltip, Legend } from 'recharts';

const COLORS = ['#4caf50', '#ff9800', '#f44336'];

const AnalysisResults = () => {
  const { analysisResults, matchResults, resumeData, jobDescription } = useResume();
  
  if (!analysisResults) {
    return (
      <Box sx={{ mt: 4, p: 2 }}>
        <Alert severity="info">
          No analysis results yet. Please analyze your resume first.
        </Alert>
      </Box>
    );
  }
  
  // Extract data for charts
  const scoreData = [
    { name: 'Content', value: analysisResults.scores.content_score },
    { name: 'Format', value: analysisResults.scores.format_score },
    { name: 'ATS', value: analysisResults.scores.ats_compatibility }
  ];
  
  const skillsMatchData = matchResults ? [
    { name: 'Matched', value: matchResults.skills_match.matched_skills.length },
    { name: 'Missing', value: matchResults.skills_match.missing_skills.length }
  ] : [];
  
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5" gutterBottom>
        Resume Analysis Results
      </Typography>
      
      <Grid container spacing={3}>
        {/* Overall Score */}
        <Grid item xs={12} md={4}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom align="center">
              Overall Score
            </Typography>
            <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: 200 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={[{ name: 'Score', value: analysisResults.overall_score }, { name: 'Remaining', value: 100 - analysisResults.overall_score }]}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    startAngle={90}
                    endAngle={-270}
                    dataKey="value"
                  >
                    <Cell fill="#4caf50" />
                    <Cell fill="#f5f5f5" />
                  </Pie>
                </PieChart>
              </ResponsiveContainer>
              <Typography 
                variant="h3" 
                sx={{ 
                  position: 'absolute',
                  color: analysisResults.overall_score > 80 ? '#4caf50' : 
                         analysisResults.overall_score > 60 ? '#ff9800' : '#f44336'
                }}
              >
                {analysisResults.overall_score}%
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" align="center" sx={{ mt: 2 }}>
              {analysisResults.overall_score > 80 
                ? 'Excellent! Your resume is well-optimized.' 
                : analysisResults.overall_score > 60 
                ? 'Good start, but there\'s room for improvement.' 
                : 'Your resume needs significant improvements.'}
            </Typography>
          </Paper>
        </Grid>
        
        {/* Score Breakdown */}
        <Grid item xs={12} md={8}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Score Breakdown
            </Typography>
            <Box sx={{ mt: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Content Quality: {analysisResults.scores.content_score}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={analysisResults.scores.content_score} 
                    color={analysisResults.scores.content_score > 80 ? 'success' : analysisResults.scores.content_score > 60 ? 'warning' : 'error'}
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    Format & Structure: {analysisResults.scores.format_score}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={analysisResults.scores.format_score} 
                    color={analysisResults.scores.format_score > 80 ? 'success' : analysisResults.scores.format_score > 60 ? 'warning' : 'error'}
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                  />
                </Grid>
                
                <Grid item xs={12}>
                  <Typography variant="subtitle2">
                    ATS Compatibility: {analysisResults.scores.ats_compatibility}%
                  </Typography>
                  <LinearProgress 
                    variant="determinate" 
                    value={analysisResults.scores.ats_compatibility} 
                    color={analysisResults.scores.ats_compatibility > 80 ? 'success' : analysisResults.scores.ats_compatibility > 60 ? 'warning' : 'error'}
                    sx={{ height: 10, borderRadius: 5, mb: 1 }}
                  />
                </Grid>
                
                {matchResults && (
                  <Grid item xs={12}>
                    <Typography variant="subtitle2">
                      Job Match: {matchResults.match_percentage}%
                    </Typography>
                    <LinearProgress 
                      variant="determinate" 
                      value={matchResults.match_percentage} 
                      color={matchResults.match_percentage > 80 ? 'success' : matchResults.match_percentage > 60 ? 'warning' : 'error'}
                      sx={{ height: 10, borderRadius: 5, mb: 1 }}
                    />
                  </Grid>
                )}
              </Grid>
            </Box>
          </Paper>
        </Grid>
        
        {/* Improvement Suggestions */}
        <Grid item xs={12}>
          <Paper elevation={2} sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Key Improvement Areas
            </Typography>
            <List>
              {analysisResults.improvement_suggestions.map((suggestion, index) => (
                <ListItem key={index} alignItems="flex-start">
                  <ListItemIcon>
                    {suggestion.priority === 'high' ? (
                      <ErrorIcon color="error" />
                    ) : suggestion.priority === 'medium' ? (
                      <WarningIcon color="warning" />
                    ) : (
                      <CheckCircleIcon color="success" />
                    )}
                  </ListItemIcon>
                  <ListItemText
                    primary={suggestion.suggestion}
                    secondary={suggestion.explanation}
                  />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* ATS Keywords */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              ATS Keywords
            </Typography>
            <Typography variant="body2" color="text.secondary" paragraph>
              These keywords were detected in your resume and are likely to be picked up by ATS systems:
            </Typography>
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {analysisResults.ats_analysis.detected_keywords.map((keyword, index) => (
                <Chip 
                  key={index} 
                  label={keyword} 
                  color="primary" 
                  variant="outlined" 
                  size="small" 
                />
              ))}
            </Box>
            
            {matchResults && (
              <>
                <Divider sx={{ my: 2 }} />
                <Typography variant="subtitle2" gutterBottom>
                  Missing Keywords from Job Description:
                </Typography>
                <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                  {matchResults.skills_match.missing_skills.map((skill, index) => (
                    <Chip 
                      key={index} 
                      label={skill} 
                      color="error" 
                      variant="outlined" 
                      size="small" 
                    />
                  ))}
                </Box>
              </>
            )}
          </Paper>
        </Grid>
        
        {/* Strengths */}
        <Grid item xs={12} md={6}>
          <Paper elevation={2} sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Resume Strengths
            </Typography>
            <List dense>
              {analysisResults.strengths.map((strength, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <ThumbUpIcon color="success" />
                  </ListItemIcon>
                  <ListItemText primary={strength} />
                </ListItem>
              ))}
            </List>
          </Paper>
        </Grid>
        
        {/* Job Match Results */}
        {matchResults && (
          <>
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Job Match Analysis
                </Typography>
                <Box sx={{ mb: 2 }}>
                  <Typography variant="body1" fontWeight="medium">
                    Match Score: {matchResults.match_percentage}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {matchResults.match_percentage > 80 
                      ? 'Excellent match! You are well-qualified for this position.' 
                      : matchResults.match_percentage > 60 
                      ? 'Good match. Consider highlighting more relevant skills.' 
                      : 'Your resume needs significant tailoring for this job.'}
                  </Typography>
                </Box>
                
                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Skills Match
                    </Typography>
                    <Box sx={{ height: 250 }}>
                      <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                          <Pie
                            data={skillsMatchData}
                            cx="50%"
                            cy="50%"
                            labelLine={false}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                            label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          >
                            <Cell fill="#4caf50" />
                            <Cell fill="#f44336" />
                          </Pie>
                          <Tooltip />
                          <Legend />
                        </PieChart>
                      </ResponsiveContainer>
                    </Box>
                  </Grid>
                  
                  <Grid item xs={12} md={6}>
                    <Typography variant="subtitle2" gutterBottom>
                      Matched Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {matchResults.skills_match.matched_skills.map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          color="success" 
                          variant="outlined" 
                          size="small" 
                        />
                      ))}
                    </Box>
                    
                    <Typography variant="subtitle2" gutterBottom sx={{ mt: 2 }}>
                      Missing Skills
                    </Typography>
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {matchResults.skills_match.missing_skills.map((skill, index) => (
                        <Chip 
                          key={index} 
                          label={skill} 
                          color="error" 
                          variant="outlined" 
                          size="small" 
                        />
                      ))}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>
            </Grid>
            
            <Grid item xs={12}>
              <Paper elevation={2} sx={{ p: 3 }}>
                <Typography variant="h6" gutterBottom>
                  Tailored Recommendations
                </Typography>
                <List>
                  {matchResults.recommendations.map((recommendation, index) => (
                    <ListItem key={index} alignItems="flex-start">
                      <ListItemIcon>
                        {recommendation.importance === 'high' ? (
                          <ErrorIcon color="error" />
                        ) : recommendation.importance === 'medium' ? (
                          <WarningIcon color="warning" />
                        ) : (
                          <CheckCircleIcon color="success" />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        primary={recommendation.title}
                        secondary={recommendation.description}
                      />
                    </ListItem>
                  ))}
                </List>
              </Paper>
            </Grid>
          </>
        )}
        
        {/* Action Buttons */}
        <Grid item xs={12}>
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mt: 2 }}>
            <Button variant="contained" color="primary">
              Download Analysis Report
            </Button>
            <Button variant="outlined" color="primary">
              Edit Resume
            </Button>
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
};

export default AnalysisResults;
