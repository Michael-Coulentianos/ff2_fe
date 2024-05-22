import {
  Typography,
  FormControlLabel,
  Checkbox,
  Button,
  Paper,
  Box,
  SelectChangeEvent,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import TextBox from "../atom/textBox";
import Dropdown from "../atom/dropdown";
import { getOrganizationFarms } from "../../api-ffm-service";
import { useFetchData } from "../../hooks/useFethData";
import { Farm } from "../../models/farm.interface";
import { useGlobalState } from "../../GlobalState";
import { createFarmFieldLink } from "../../api-gs-service";

const FieldForm = ({ fieldData }) => {
  const { selectedOrganization } = useGlobalState();
  const [farms, setFarms] = useState<Farm[]>([]);
  useFetchData(getOrganizationFarms, setFarms, undefined, [
    selectedOrganization?.organizationId ?? 0,
  ]);
  console.log("fieldData");
  console.log(fieldData);

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
    console.log(event);
    const { name, value, checked } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]:
        name === "irrigated" || name === "seasonalField" || name === "farm"
          ? checked
          : value,
    }));
  };

  const handleDropdownChange = (event: SelectChangeEvent<string | number>) => {
    const { name, value } = event.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission (e.g., send data to server)
    console.log("Form data submitted:", formData);
    createFarmFieldLink(fieldData.cropperRef, formData.farm);
  };

  // Convert farms array to dropdown items
  const farmItems = farms.map((farm) => ({
    value: farm.farmIdentifier,
    label: farm.farm,
  }));

  return (
    <Paper elevation={3} sx={{ marginTop: 1, padding: 1 }}>
      <Typography variant="h6">Field Details</Typography>
      <form onSubmit={handleSubmit}>
        <Box sx={{ overflow: "auto" }}>
          <TextBox
            label="Field Name"
            //name="name"
            value={formData.name}
            onChange={handleChange}
            sx={{ marginTop: 0.5 }}
          />
          <TextBox
            label="Size"
            //name="size"
            value={formData.size}
            onChange={handleChange}
            sx={{ marginTop: 0.5 }}
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

          <Dropdown
            label="Farm"
            name="farm"
            value={fieldData.farmId}
            items={farmItems}
            onChange={handleDropdownChange}
          ></Dropdown>

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
            sx={{ marginTop: 0.5 }}
            multiline
            rows={1.5}
          />
          <TextBox
            label="Crop History"
            //name="cropHistory"
            value={formData.cropHistory}
            onChange={handleChange}
            sx={{ marginTop: 0.5 }}
          />
          <TextBox
            label="Notes"
            //name="notes"
            value={formData.notes}
            onChange={handleChange}
            sx={{ marginTop: 0.5 }}
            multiline
            rows={1.5}
          />
        </Box>
        <Button type="submit" variant="contained" color="primary">
          Save
        </Button>
      </form>
    </Paper>
  );
};

export default FieldForm;
