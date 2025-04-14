import React, { useState } from "react";
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormLabel,
  Radio,
  RadioGroup,
  Select,
  MenuItem,
  InputLabel,
  TextField,
  Typography
} from "@mui/material";

/**
 * Helper to create a default "Symptom" object.
 * Each symptom tracks:
 *   - name: e.g., "Chest Pain", "Cough", ...
 *   - startDate: e.g., "Today", "Yesterday", "Last Week", "Other"
 *   - otherStartDescription: custom text if the user picks "Other"
 *   - isPresent: boolean
 *   - frequency: e.g., "Once", "Twice", ...
 *   - severity: e.g., "Mild", "Moderate", "Severe" (for current symptoms)
 *   - pastSeverity: e.g., "None", "Mild", ... (if symptom is no longer present)
 *   - similarSymptomsBefore: boolean
 *   - radiation: array of body areas if chest/abdominal pain
 *   - quality: string describing the pain quality
 */
function getDefaultSymptom() {
  return {
    name: "",
    startDate: "Today",
    otherStartDescription: "",
    isPresent: true,
    frequency: "Once",
    severity: "Mild",
    pastSeverity: "None",
    similarSymptomsBefore: false,
    radiation: [],
    quality: ""
  };
}

const SymptomForm = ({ onSubmit }) => {
  // We keep an array of symptoms to handle "Chief Complaint + Associated Symptoms"
  const [symptoms, setSymptoms] = useState([getDefaultSymptom()]);
  // Store Past Medical History
  const [pastMedicalHistory, setPastMedicalHistory] = useState("");

  // Add a new symptom object
  const handleAddSymptom = () => {
    setSymptoms((prev) => [...prev, getDefaultSymptom()]);
  };

  // Remove a symptom by index
  const handleRemoveSymptom = (index) => {
    setSymptoms((prev) => prev.filter((_, i) => i !== index));
  };

  // Update a single symptom’s field
  const handleSymptomChange = (index, field, value) => {
    setSymptoms((prev) =>
      prev.map((sym, i) => {
        if (i !== index) return sym;
        return {
          ...sym,
          [field]: value
        };
      })
    );
  };
  
  // On form submit, compile all data into a single object
  const handleSubmit = (e) => {
    e.preventDefault();

    // Post-processing "quality" for chest/abdominal pain:
    //   If user picked "concentrated in one location," store "localized"
    //   If user picked "spread out," store "diffuse"
    const processedSymptoms = symptoms.map((sym) => {
      let finalQuality = sym.quality;
      if (finalQuality === "concentrated in one location") {
        finalQuality = "localized";
      } else if (finalQuality === "spread out") {
        finalQuality = "diffuse";
      }
      return {
        ...sym,
        quality: finalQuality
      };
    });

    const formData = {
      symptoms: processedSymptoms,
      pastMedicalHistory
    };

    // Pass data back to parent or route
    onSubmit(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ p: 2, maxWidth: 700, mx: "auto" }}>
      <Typography variant="h5" gutterBottom>
        Symptom Input Form
      </Typography>

      {symptoms.map((symptom, index) => {
        const isChestOrAbdPain =
          symptom.name.toLowerCase().includes("chest") ||
          symptom.name.toLowerCase().includes("abdom");

        return (
          <Box
            key={index}
            sx={{ border: "1px solid #ccc", borderRadius: 2, p: 2, mb: 3 }}
          >
            <Typography variant="h6" sx={{ mb: 2 }}>
              {index === 0 ? "Chief Complaint" : `Associated Symptom #${index}`}
            </Typography>

            {/* Symptom Name */}
            <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
              <InputLabel id={`symptom-name-${index}`}>Symptom</InputLabel>
              <Select
                labelId={`symptom-name-${index}`}
                label="Symptom"
                value={symptom.name}
                onChange={(e) => handleSymptomChange(index, "name", e.target.value)}
              >
                <MenuItem value="Chest Pain">Chest Pain</MenuItem>
                <MenuItem value="Abdominal Pain">Abdominal Pain</MenuItem>
                <MenuItem value="Cough">Cough</MenuItem>
                <MenuItem value="Constipation">Constipation</MenuItem>
                <MenuItem value="Cold Intolerance">Cold Intolerance</MenuItem>
                {/* Add more common symptoms as needed */}
              </Select>
            </FormControl>

            {/* Start Date */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel>When did it start?</FormLabel>
              <RadioGroup
                row
                value={symptom.startDate}
                onChange={(e) => handleSymptomChange(index, "startDate", e.target.value)}
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
              {symptom.startDate === "Other" && (
                <TextField
                  variant="outlined"
                  placeholder="Describe how long ago..."
                  sx={{ mt: 1 }}
                  value={symptom.otherStartDescription}
                  onChange={(e) =>
                    handleSymptomChange(index, "otherStartDescription", e.target.value)
                  }
                />
              )}
            </FormControl>

            {/* Is symptom still present? */}
            <FormControlLabel
              control={
                <Checkbox
                  checked={symptom.isPresent}
                  onChange={(e) =>
                    handleSymptomChange(index, "isPresent", e.target.checked)
                  }
                />
              }
              label="Is this symptom still present?"
              sx={{ mb: 2 }}
            />

            {/* If still present, show frequency & severity, else show past severity */}
            {symptom.isPresent ? (
              <>
                {/* Frequency */}
                <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                  <InputLabel id={`freq-label-${index}`}>Frequency</InputLabel>
                  <Select
                    labelId={`freq-label-${index}`}
                    label="Frequency"
                    value={symptom.frequency}
                    onChange={(e) => handleSymptomChange(index, "frequency", e.target.value)}
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
                    value={symptom.severity}
                    onChange={(e) => handleSymptomChange(index, "severity", e.target.value)}
                  >
                    <FormControlLabel value="Mild" control={<Radio />} label="Mild" />
                    <FormControlLabel
                      value="Moderate"
                      control={<Radio />}
                      label="Moderate"
                    />
                    <FormControlLabel value="Severe" control={<Radio />} label="Severe" />
                  </RadioGroup>
                </FormControl>
              </>
            ) : (
              <FormControl fullWidth variant="outlined" sx={{ mb: 2 }}>
                <InputLabel id={`past-severity-label-${index}`}>
                  Past Symptom Severity
                </InputLabel>
                <Select
                  labelId={`past-severity-label-${index}`}
                  label="Past Symptom Severity"
                  value={symptom.pastSeverity}
                  onChange={(e) =>
                    handleSymptomChange(index, "pastSeverity", e.target.value)
                  }
                >
                  <MenuItem value="None">None</MenuItem>
                  <MenuItem value="Mild">Mild</MenuItem>
                  <MenuItem value="Moderate">Moderate</MenuItem>
                  <MenuItem value="Severe">Severe</MenuItem>
                </Select>
              </FormControl>
            )}

            {/* Have you had similar symptoms previously? */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <FormLabel>Have you had similar symptoms previously?</FormLabel>
              <RadioGroup
                row
                value={symptom.similarSymptomsBefore ? "Yes" : "No"}
                onChange={(e) =>
                  handleSymptomChange(index, "similarSymptomsBefore", e.target.value === "Yes")
                }
              >
                <FormControlLabel value="Yes" control={<Radio />} label="Yes" />
                <FormControlLabel value="No" control={<Radio />} label="No" />
              </RadioGroup>
            </FormControl>

            {/* If chest or abdominal pain, ask about Radiation & Quality */}
            {isChestOrAbdPain && (
              <>
                <Typography variant="body1" sx={{ mt: 2, mb: 1, fontWeight: "bold" }}>
                  Additional Questions for {symptom.name}
                </Typography>

                {/* Radiation (check all that apply) */}
                <FormControl component="fieldset" sx={{ mb: 2 }}>
                  <FormLabel component="legend">Does the pain radiate?</FormLabel>
                  <Box sx={{ display: "flex", flexDirection: "row", flexWrap: "wrap" }}>
                    {["Neck", "Shoulder", "Arm", "Back", "None"].map((area) => (
                      <FormControlLabel
                        key={area}
                        control={
                          <Checkbox
                            checked={symptom.radiation.includes(area)}
                            onChange={(e) => {
                              const checked = e.target.checked;
                              const currentRadiation = symptom.radiation;
                              let updated = [];
                              if (checked) {
                                // Add area
                                if (area === "None") {
                                  // If "None" is checked, clear out the others
                                  updated = ["None"];
                                } else {
                                  // Remove "None" if previously selected
                                  updated = currentRadiation
                                    .filter((r) => r !== "None")
                                    .concat(area);
                                }
                              } else {
                                // Remove area
                                updated = currentRadiation.filter((r) => r !== area);
                              }
                              handleSymptomChange(index, "radiation", updated);
                            }}
                          />
                        }
                        label={area}
                      />
                    ))}
                  </Box>
                </FormControl>

                {/* Quality */}
                <FormControl fullWidth sx={{ mb: 2 }}>
                  <InputLabel id={`quality-label-${index}`}>Quality</InputLabel>
                  <Select
                    labelId={`quality-label-${index}`}
                    label="Quality"
                    value={symptom.quality}
                    onChange={(e) => handleSymptomChange(index, "quality", e.target.value)}
                  >
                    {/* Example pain-quality descriptors */}
                    <MenuItem value="tightness">Tightness</MenuItem>
                    <MenuItem value="pressure">Pressure</MenuItem>
                    <MenuItem value="burning">Burning</MenuItem>
                    <MenuItem value="dull">Dull</MenuItem>
                    <MenuItem value="sharp">Sharp</MenuItem>
                    <MenuItem value="throbbing">Throbbing</MenuItem>
                    <MenuItem value="worsens with breathing/coughing">
                      Worsens with breathing/coughing
                    </MenuItem>
                    <MenuItem value="concentrated in one location">
                      Concentrated in one location
                    </MenuItem>
                    <MenuItem value="spread out">Spread out</MenuItem>
                  </Select>
                </FormControl>
              </>
            )}

            {/* Remove Symptom Button (if more than one) */}
            {symptoms.length > 1 && (
              <Button
                variant="outlined"
                color="error"
                onClick={() => handleRemoveSymptom(index)}
              >
                Remove This Symptom
              </Button>
            )}
          </Box>
        );
      })}

      {/* Add Another Symptom */}
      <Button variant="outlined" sx={{ mb: 3 }} onClick={handleAddSymptom}>
        Add Another Symptom
      </Button>

      {/* Past Medical History */}
      <Typography variant="h6" sx={{ mb: 1 }}>
        Past Medical History
      </Typography>
      <TextField
        multiline
        rows={4}
        fullWidth
        variant="outlined"
        placeholder="Type out any relevant past medical conditions..."
        value={pastMedicalHistory}
        onChange={(e) => setPastMedicalHistory(e.target.value)}
        sx={{ mb: 3 }}
      />

      <Button variant="contained" color="primary" type="submit">
        Generate EHR
      </Button>
    </Box>
  );
};

export default SymptomForm;
