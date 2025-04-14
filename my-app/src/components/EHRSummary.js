import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Card,
  CardContent,
  Button,
  Box,
  Divider
} from "@mui/material";

const EHRSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check if the form state was passed
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

  const { symptoms, pastMedicalHistory } = location.state;

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Preliminary Electronic Health Record (EHR)
      </Typography>

      {symptoms.map((symptom, index) => {
        // Determine the heading text for the symptom
        const heading = index === 0 ? "Chief Complaint" : `Associated Symptom #${index}`;

        // Determine if this symptom should show additional chest/abdominal details
        const isChestOrAbdPain = 
          symptom.name.toLowerCase().includes("chest") ||
          symptom.name.toLowerCase().includes("abdom");

        return (
          <Card key={index} sx={{ mb: 3, p: 1 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {heading}
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body1">
                <strong>Symptom:</strong> {symptom.name}
              </Typography>
              <Typography variant="body1">
                <strong>Start Date:</strong> {symptom.startDate}
              </Typography>
              {symptom.startDate === "Other" && symptom.otherStartDescription && (
                <Typography variant="body1">
                  <strong>Description:</strong> {symptom.otherStartDescription}
                </Typography>
              )}
              <Typography variant="body1">
                <strong>Is Present:</strong>{" "}
                {symptom.isPresent ? "Yes" : "No"}
              </Typography>
              {symptom.isPresent ? (
                <>
                  <Typography variant="body1">
                    <strong>Frequency:</strong> {symptom.frequency}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Current Severity:</strong> {symptom.severity}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1">
                  <strong>Past Severity:</strong> {symptom.pastSeverity}
                </Typography>
              )}
              <Typography variant="body1">
                <strong>Had Similar Symptoms Before:</strong>{" "}
                {symptom.similarSymptomsBefore ? "Yes" : "No"}
              </Typography>

              {isChestOrAbdPain && (
                <>
                  {symptom.radiation && symptom.radiation.length > 0 && (
                    <Typography variant="body1">
                      <strong>Radiation:</strong>{" "}
                      {symptom.radiation.join(", ")}
                    </Typography>
                  )}
                  {symptom.quality && (
                    <Typography variant="body1">
                      <strong>Quality:</strong> {symptom.quality}
                    </Typography>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );
      })}

      <Card sx={{ mb: 3, p: 1 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Past Medical History
          </Typography>
          <Divider sx={{ mb: 1 }} />
          <Typography variant="body1">
            {pastMedicalHistory.trim() !== "" ? pastMedicalHistory : "None"}
          </Typography>
        </CardContent>
      </Card>

      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained" onClick={() => navigate("/")}>
          Return to Home
        </Button>
      </Box>
    </Container>
  );
};

export default EHRSummary;
