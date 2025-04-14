import React, { useState } from "react";
import {
  Button,
  TextField,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Typography,
  FormControlLabel,
  Checkbox,
  FormLabel,
  RadioGroup,
  Radio,
  Box
} from "@mui/material";

const SymptomForm = ({ onSubmit }) => {
  const [chiefComplaint, setChiefComplaint] = useState("");
  const [startDate, setStartDate] = useState("Today");
  const [severity, setSeverity] = useState("Mild");
  const [symptomPresent, setSymptomPresent] = useState(true);
  const [frequency, setFrequency] = useState("Once");
  const [pastSeverity, setPastSeverity] = useState("None");

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const formData = {
      chiefComplaint,
      startDate,
      severity: symptomPresent ? severity : pastSeverity,
      symptomPresent,
      frequency: symptomPresent ? frequency : null,
    };
    onSubmit(formData);
  };

  return (
    <Box
      component="form"
      onSubmit={handleFormSubmit}
      sx={{ maxWidth: 600, margin: "auto", mt: 4, p: 2 }}
    >
      <Typography variant="h5" sx={{ mb: 2 }}>
        Symptom Input Form
      </Typography>

      {/* Chief Complaint */}
      <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
        <InputLabel id="chief-complaint-label">Chief Complaint</InputLabel>
        <Select
          labelId="chief-complaint-label"
          label="Chief Complaint"
          value={chiefComplaint}
          onChange={(e) => setChiefComplaint(e.target.value)}
        >
          <MenuItem value="Cough">Cough</MenuItem>
          <MenuItem value="Constipation">Constipation</MenuItem>
          <MenuItem value="Cold Intolerance">Cold Intolerance</MenuItem>
          {/* Add more as needed */}
        </Select>
      </FormControl>

      {/* Start Date */}
      <FormControl fullWidth sx={{ mb: 2 }}>
        <FormLabel>Started</FormLabel>
        <RadioGroup
          row
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
        >
          <FormControlLabel value="Today" control={<Radio />} label="Today" />
          <FormControlLabel
            value="Yesterday"
            control={<Radio />}
            label="Yesterday"
          />
          <FormControlLabel
            value="Last week"
            control={<Radio />}
            label="Last Week"
          />
          <FormControlLabel
            value="Other"
            control={<Radio />}
            label="Other (describe)"
          />
        </RadioGroup>
        {startDate === "Other" && (
          <TextField
            variant="outlined"
            placeholder="Describe how long ago..."
            sx={{ mt: 1 }}
          />
        )}
      </FormControl>

      {/* Symptom Present */}
      <FormControlLabel
        control={
          <Checkbox
            checked={symptomPresent}
            onChange={(e) => setSymptomPresent(e.target.checked)}
          />
        }
        label="Is this symptom still present?"
        sx={{ mb: 2 }}
      />

      {symptomPresent ? (
        <>
          {/* Frequency */}
          <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
            <InputLabel id="frequency-label">Frequency</InputLabel>
            <Select
              labelId="frequency-label"
              label="Frequency"
              value={frequency}
              onChange={(e) => setFrequency(e.target.value)}
            >
              <MenuItem value="Once">Once</MenuItem>
              <MenuItem value="Twice">Twice</MenuItem>
              <MenuItem value="A few times">A few times</MenuItem>
              <MenuItem value="Several times">Several times</MenuItem>
            </Select>
          </FormControl>

          {/* Current Severity */}
          <FormControl fullWidth sx={{ mb: 2 }}>
            <FormLabel>Current Severity</FormLabel>
            <RadioGroup
              row
              value={severity}
              onChange={(e) => setSeverity(e.target.value)}
            >
              <FormControlLabel value="Mild" control={<Radio />} label="Mild" />
              <FormControlLabel
                value="Moderate"
                control={<Radio />}
                label="Moderate"
              />
              <FormControlLabel
                value="Severe"
                control={<Radio />}
                label="Severe"
              />
            </RadioGroup>
          </FormControl>
        </>
      ) : (
        /* Past Severity */
        <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
          <InputLabel id="past-severity-label">
            Severity of past symptoms
          </InputLabel>
          <Select
            labelId="past-severity-label"
            label="Severity of past symptoms"
            value={pastSeverity}
            onChange={(e) => setPastSeverity(e.target.value)}
          >
            <MenuItem value="None">None</MenuItem>
            <MenuItem value="Mild">Mild</MenuItem>
            <MenuItem value="Moderate">Moderate</MenuItem>
            <MenuItem value="Severe">Severe</MenuItem>
          </Select>
        </FormControl>
      )}

      {/* Submit */}
      <Button variant="contained" color="primary" type="submit">
        Generate EHR
      </Button>
    </Box>
  );
};

export default SymptomForm;
