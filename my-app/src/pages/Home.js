import React from 'react';
import { Box, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        minHeight: '100vh',               // Ensures full viewport height
        background: 'linear-gradient(135deg,rgb(33, 124, 243) 0%,rgb(176, 39, 110) 100%)', // Gradient background: blue to purple
        display: 'flex',
        alignItems: 'center',             // Vertically center content
        justifyContent: 'center',         // Horizontally center content
      }}
    >
      <Box textAlign="center" color="white" p={3}>
        <Typography variant="h3" sx={{ mb: 2 }}>
          Welcome to Our Medical Helper
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 4 }}>
          An easier way to prepare your health information and find the care you need.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 1 }}
          onClick={() => navigate('/not-sure-who-to-see')}
        >
          Not Sure Who to See
        </Button>
        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 1 }}
          onClick={() => navigate('/newly-diagnosed')}
        >
          Newly Diagnosed
        </Button>
      </Box>
    </Box>
  );
};

export default Home;
