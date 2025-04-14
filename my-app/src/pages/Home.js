import React from "react";
import { useNavigate } from "react-router-dom";
import { Container, Typography, Button, Box } from "@mui/material";

const Home = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ textAlign: "center", mt: 10 }}>
      <Typography variant="h4" gutterBottom>
        Welcome to Our Medical Helper
      </Typography>
      <Typography variant="subtitle1" gutterBottom>
        An easier way to prepare your health information and find the care you need.
      </Typography>

      <Box sx={{ mt: 4 }}>
        <Button
          variant="contained"
          color="primary"
          sx={{ m: 1 }}
          onClick={() => navigate("/not-sure-who-to-see")}
        >
          Not Sure Who to See
        </Button>

        <Button
          variant="contained"
          color="secondary"
          sx={{ m: 1 }}
          onClick={() => navigate("/newly-diagnosed")}
        >
          Newly Diagnosed
        </Button>
      </Box>
    </Container>
  );
};

export default Home;
