import React from "react";
import {
  Container,
  Typography,
  Card,
  CardContent,
  CardActions,
  Button,
  Box,
} from "@mui/material";

const NewlyDiagnosed = () => {
  return (
    <Container maxWidth="md" sx={{ mt: 4 }}>
      <Typography variant="h4" gutterBottom>
        Resources for the Newly Diagnosed
      </Typography>

      {/* Insurance Plans */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">Insurance Plans</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Brief overview of different insurance types (HMO, PPO, Medicare, Medicaid, etc.).
            Provide links or more info as needed.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">Learn More</Button>
        </CardActions>
      </Card>

      {/* Mental Support Systems */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">Mental Support Systems</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Resources for mental health counseling, support groups, etc.
            Tailor to specific diagnoses if needed.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">Find Support Groups</Button>
        </CardActions>
      </Card>

      {/* Patient Rights */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">Patient Rights (HIPAA, etc.)</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Overview of privacy rights, HIPAA guidelines, and how patients can
            access or share their own records.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">Read HIPAA Guidelines</Button>
        </CardActions>
      </Card>

      {/* Advance Directives */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">Advance Directives</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            Explanation of living wills, healthcare proxies, and how to create
            them.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">Learn About Directives</Button>
        </CardActions>
      </Card>

      {/* Symptom/Mood Tracker */}
      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h5">Symptom Tracker</Typography>
          <Typography variant="body1" sx={{ mt: 2 }}>
            A calendar to log daily physical/mental symptoms. Helps patients provide a comprehensive 
            illness history to their providers. You can integrate a library like react-calendar or build your own.
          </Typography>
        </CardContent>
        <CardActions>
          <Button variant="outlined">Go to Symptom Tracker</Button>
        </CardActions>
      </Card>
    </Container>
  );
};

export default NewlyDiagnosed;
