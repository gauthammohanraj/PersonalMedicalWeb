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

/**
 * Examines the list of symptoms and returns recommended specialties.
 * You can expand this logic to include additional symptom details.
 */
function getRecommendedSpecialties(symptoms) {
  const specialties = new Set();

  symptoms.forEach((sym) => {
    const name = sym.name.toLowerCase();
    // Example rules:
    if (name.includes("cough") && sym.isPresent) {
      specialties.add("Pulmonology or Infectious Disease");
    }
    if (name.includes("chest pain")) {
      specialties.add("Cardiology");
    }
    if (name.includes("abdominal pain")) {
      specialties.add("Gastroenterology");
    }
    if (name.includes("cold intolerance")) {
      specialties.add("Endocrinology");
    }
    if (name.includes("difficulty swallowing") || name.includes("throat pain")) {
      specialties.add("ENT");
    }
    // (You can add more rules here depending on the details you collect.)
  });

  // If no rule matches, default to Primary Care.
  if (specialties.size === 0) {
    specialties.add("Primary Care / Internal Medicine");
  }

  return Array.from(specialties).join(", ");
}

const EHRSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();

  // Check whether state was passed via navigate()
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

  const recommendedSpecialties = getRecommendedSpecialties(symptoms);

  return (
    <Container maxWidth="md" sx={{ mt: 5, mb: 5 }}>
      <Typography variant="h4" gutterBottom textAlign="center">
        Preliminary Electronic Health Record (EHR)
      </Typography>

      {symptoms.map((sym, idx) => {
        const heading = idx === 0 ? "Chief Complaint" : `Associated Symptom #${idx}`;
        const isChestOrAbdPain =
          sym.name.toLowerCase().includes("chest") ||
          sym.name.toLowerCase().includes("abdom");

        return (
          <Card key={idx} sx={{ mb: 3 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                {heading}
              </Typography>
              <Divider sx={{ mb: 1 }} />
              <Typography variant="body1">
                <strong>Symptom:</strong> {sym.name}
              </Typography>
              <Typography variant="body1">
                <strong>When It Started:</strong> {sym.startDate}
              </Typography>
              {sym.startDate === "Other" && sym.otherStartDescription && (
                <Typography variant="body1">
                  <strong>Description:</strong> {sym.otherStartDescription}
                </Typography>
              )}
              <Typography variant="body1">
                <strong>Is Present:</strong> {sym.isPresent ? "Yes" : "No"}
              </Typography>
              {sym.isPresent ? (
                <>
                  <Typography variant="body1">
                    <strong>Frequency:</strong> {sym.frequency}
                  </Typography>
                  <Typography variant="body1">
                    <strong>Current Severity:</strong> {sym.severity}
                  </Typography>
                </>
              ) : (
                <Typography variant="body1">
                  <strong>Past Severity:</strong> {sym.pastSeverity}
                </Typography>
              )}
              <Typography variant="body1">
                <strong>Had Similar Symptoms Before:</strong> {sym.similarSymptomsBefore ? "Yes" : "No"}
              </Typography>
              {isChestOrAbdPain && (
                <>
                  {sym.radiation && sym.radiation.length > 0 && (
                    <Typography variant="body1">
                      <strong>Radiation:</strong> {sym.radiation.join(", ")}
                    </Typography>
                  )}
                  {sym.quality && (
                    <Typography variant="body1">
                      <strong>Quality:</strong> {sym.quality}
                    </Typography>
                  )}
                </>
              )}
            </CardContent>
          </Card>
        );
      })}

      <Card sx={{ mb: 3 }}>
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

      <Card sx={{ mb: 3 }}>
        <CardContent>
          <Typography variant="h6" gutterBottom>
            Recommended Specialties
          </Typography>
          <Typography variant="body1">{recommendedSpecialties}</Typography>
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
