import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
} from "@mui/material";

// Example helper function to suggest a specialty
function getRecommendedSpecialty(chiefComplaint) {
  switch (chiefComplaint) {
    case "Cough":
      return "Pulmonology or Infectious Disease";
    case "Constipation":
      return "Gastroenterology";
    case "Cold Intolerance":
      return "Endocrinology (Thyroid)";
    default:
      return "General Practice / Internal Medicine";
  }
}

const EHRSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const {
    chiefComplaint,
    startDate,
    severity,
    symptomPresent,
    frequency,
    pastSeverity,
  } = location.state || {};

  if (!location.state) {
    return (
      <Container sx={{ mt: 5, textAlign: "center" }}>
        <Typography variant="h6">
          No symptom data found. Please fill out the form first.
        </Typography>
        <Button
          variant="contained"
          sx={{ mt: 2 }}
          onClick={() => navigate("/not-sure-who-to-see")}
        >
          Go to Symptom Form
        </Button>
      </Container>
    );
  }

  const recommendedSpecialty = getRecommendedSpecialty(chiefComplaint);

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Preliminary Electronic Health Record (EHR)
          </Typography>
          <Typography variant="body1">
            <strong>Chief Complaint:</strong> {chiefComplaint}
          </Typography>
          <Typography variant="body1">
            <strong>Started:</strong> {startDate}
          </Typography>
          <Typography variant="body1">
            <strong>Severity:</strong> {severity}
          </Typography>
          <Typography variant="body1">
            <strong>Symptom Present?:</strong> {symptomPresent ? "Yes" : "No"}
          </Typography>
          <Typography variant="body1">
            <strong>Frequency:</strong> {frequency}
          </Typography>
          <Typography variant="body1">
            <strong>Past Symptom Severity:</strong> {pastSeverity}
          </Typography>
          <Box sx={{ mt: 2 }}>
            <Typography variant="h6" color="primary">
              Recommended Specialty: {recommendedSpecialty}
            </Typography>
          </Box>
        </CardContent>
      </Card>
      <Box sx={{ textAlign: "center", mt: 3 }}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </Box>
    </Container>
  );
};

export default EHRSummary;
