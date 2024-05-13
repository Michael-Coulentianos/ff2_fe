import {
  Container,
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
} from "@mui/material";
import React, { useState } from "react";
import TextBox from "../atom/textBox";

const FieldForm = () => {
  const [formData, setFormData] = useState({
    name: "",
    size: "",
    irrigated: false,
    farm: "",
    seasonalField: false,
    activities: "",
    cropHistory: "",
    notes: "",
  });

  const handleChange = (event) => {
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "irrigated" || name === "seasonalField" ? checked : value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log("Form data submitted:", formData);
  };

  return (
    <Paper elevation={3} sx={{ marginTop: 1, padding: 1 }}>
      <Typography variant="h6">Field Details</Typography>
      <form onSubmit={handleSubmit}>
        <TextBox
          label="Field Name"
          value={formData.name}
          onChange={handleChange}
        />
        <TextBox label="Size" value={formData.size} onChange={handleChange} />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.irrigated}
              onChange={handleChange}
              name="irrigated"
              color="primary"
            />
          }
          label="Irrigated Field"
        />
        <TextBox label="Farm" value={formData.farm} onChange={handleChange} />
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.seasonalField}
              onChange={handleChange}
              name="seasonalField"
              color="primary"
            />
          }
          label="Seasonal Field"
        />
        <TextBox
          label="Activities"
          value={formData.activities}
          onChange={handleChange}
          multiline
          rows={1.5}
        />
        <TextBox
          label="Crop History"
          value={formData.cropHistory}
          onChange={handleChange}
        />
        <TextBox
          label="Notes"
          value={formData.notes}
          onChange={handleChange}
          multiline
          rows={1.5}
        />
        <Button type="submit" variant="contained" color="primary" sx={{padding:0}}>
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default FieldForm;
