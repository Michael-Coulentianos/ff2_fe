import {
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TextBox from "../atom/textBox";

const FieldForm = ({ fieldData }) => {
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

  console.log(formData);

  useEffect(() => {
    if (fieldData) {
      setFormData({
        name: fieldData.fieldName || "",
        size: fieldData.size || "",
        irrigated: fieldData.irrigated || false,
        farm: fieldData.farm || "",
        seasonalField: fieldData.seasonalField || false,
        activities: fieldData.activities || "",
        cropHistory: fieldData.cropHistory || "",
        notes: fieldData.notes || "",
      });
    }
  }, [fieldData]);

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
    <Paper elevation={3} sx={{ marginTop: 1, padding: 1, minHeight: "510px" }}>
      <Typography variant="h6">Field Details</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ overflow: "auto" }}>
          <TextBox
            label="Field Name"
            //name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ marginTop: 1 }}
          />
          <TextBox
            label="Size"
            //name="size"
            value={formData.size}
            onChange={handleChange}
            sx={{ marginTop: 1 }}
          />
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
          <TextBox
            label="Farm"
            //name="farm"
            value={formData.farm}
            onChange={handleChange}
            sx={{ marginTop: 1 }}
          />
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
            //name="activities"
            value={formData.activities}
            onChange={handleChange}
            sx={{ marginTop: 1 }}
            multiline
            rows={1.5}
          />
          <TextBox
            label="Crop History"
            //name="cropHistory"
            value={formData.cropHistory}
            onChange={handleChange}
            sx={{ marginTop: 1 }}
          />
          <TextBox
            label="Notes"
            //name="notes"
            value={formData.notes}
            onChange={handleChange}
            sx={{ marginTop: 1 }}
            multiline
            rows={1.5}
          />
          <Button type="submit" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </form>
    </Paper>
  );
};

export default FieldForm;
