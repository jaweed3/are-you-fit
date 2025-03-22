import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import {
  Box,
  Container,
  Grid,
  Typography,
  Link,
  Divider,
  IconButton,
  useTheme,
} from '@mui/material';
import FacebookIcon from '@mui/icons-material/Facebook';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import InstagramIcon from '@mui/icons-material/Instagram';
import Logo from '../../assets/logo.png';

const Footer = () => {
  const theme = useTheme();
  const year = new Date().getFullYear();
  
  return (
    <Box
      component="footer"
      sx={{
        py: 6,
        px: 2,
        mt: 'auto',
        backgroundColor: theme.palette.grey[100],
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} sm={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <img 
                src={Logo} 
                alt="ResumeAI Logo" 
                style={{ height: 40, marginRight: 10 }}
              />
              <Typography variant="h6" color="text.primary">
                ResumeAI
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" paragraph>
              Create professional resumes with AI assistance. 
              Tailor your resume to specific job descriptions and 
              get instant feedback to improve your chances of landing interviews.
            </Typography>
            <Box sx={{ mt: 2 }}>
              <IconButton color="primary" aria-label="facebook">
                <FacebookIcon />
              </IconButton>
              <IconButton color="primary" aria-label="twitter">
                <TwitterIcon />
              </IconButton>
              <IconButton color="primary" aria-label="linkedin">
                <LinkedInIcon />
              </IconButton>
              <IconButton color="primary" aria-label="instagram">
                <InstagramIcon />
              </IconButton>
            </Box>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Features
            </Typography>
            <Link component={RouterLink} to="/features" color="inherit" display="block" sx={{ mb: 1 }}>
              Resume Builder
            </Link>
            <Link component={RouterLink} to="/features" color="inherit" display="block" sx={{ mb: 1 }}>
              AI Assistance
            </Link>
            <Link component={RouterLink} to="/features" color="inherit" display="block" sx={{ mb: 1 }}>
              Job Matching
            </Link>
            <Link component={RouterLink} to="/features" color="inherit" display="block" sx={{ mb: 1 }}>
              Resume Analysis
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Resources
            </Typography>
            <Link component={RouterLink} to="/blog" color="inherit" display="block" sx={{ mb: 1 }}>
              Blog
            </Link>
            <Link component={RouterLink} to="/templates" color="inherit" display="block" sx={{ mb: 1 }}>
              Templates
            </Link>
            <Link component={RouterLink} to="/examples" color="inherit" display="block" sx={{ mb: 1 }}>
              Examples
            </Link>
            <Link component={RouterLink} to="/faq" color="inherit" display="block" sx={{ mb: 1 }}>
              FAQ
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Company
            </Typography>
            <Link component={RouterLink} to="/about" color="inherit" display="block" sx={{ mb: 1 }}>
              About Us
            </Link>
            <Link component={RouterLink} to="/contact" color="inherit" display="block" sx={{ mb: 1 }}>
              Contact
            </Link>
            <Link component={RouterLink} to="/careers" color="inherit" display="block" sx={{ mb: 1 }}>
              Careers
            </Link>
            <Link component={RouterLink} to="/press" color="inherit" display="block" sx={{ mb: 1 }}>
              Press
            </Link>
          </Grid>
          
          <Grid item xs={12} sm={2}>
            <Typography variant="subtitle1" color="text.primary" gutterBottom>
              Legal
            </Typography>
            <Link component={RouterLink} to="/privacy" color="inherit" display="block" sx={{ mb: 1 }}>
              Privacy Policy
            </Link>
            <Link component={RouterLink} to="/terms" color="inherit" display="block" sx={{ mb: 1 }}>
              Terms of Service
            </Link>
            <Link component={RouterLink} to="/cookies" color="inherit" display="block" sx={{ mb: 1 }}>
              Cookie Policy
            </Link>
          </Grid>
        </Grid>
        
        <Divider sx={{ mt: 4, mb: 4 }} />
        
        <Box sx={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap' }}>
          <Typography variant="body2" color="text.secondary">
            © {year} ResumeAI. All rights reserved.
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Made with ❤️ for job seekers everywhere
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;