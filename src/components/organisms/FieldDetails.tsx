import {
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  DialogContent,
  Paper,
  Typography,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { getOrganizationFarms } from "../../api-ffm-service";
import { useFetchData } from "../../hooks/useFethData";
import { Farm } from "../../models/farm.interface";
import { useGlobalState } from "../../GlobalState";
import { createFarmFieldLink, getFieldMetaData } from "../../api-gs-service";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormSection from "../molecules/DynamicFormSection";
import { useNavigate } from "react-router-dom";

const validationSchema = yup.object({
  name: yup.string().required(),
  size: yup.number().optional(),
  metadata: yup
    .object({
      irrDry: yup
        .string()
        .oneOf(["Irrigated", "Non-Irrigated", "Dry"])
        .optional(),
    })
    .required(),
  farmId: yup.string().optional(),
  seasonalField: yup.boolean(),
  activities: yup.string().optional(),
  cropHistory: yup.string().optional(),
  notes: yup.string().optional(),
});

const FieldForm = ({ initialFieldData, onFieldDataChange }) => {
  const navigate = useNavigate();
  const { selectedOrganization } = useGlobalState();
  const [farms, setFarms] = useState<Farm[]>([]);
  useFetchData(getOrganizationFarms, setFarms, undefined, [
    selectedOrganization?.organizationId ?? 0,
  ]);

  const [fieldData, setFieldData] = useState(initialFieldData);

  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      farmId: fieldData?.farmId || "", // Set default value for farm
      // other default values...
    },
  });

  const fetchFieldData = async (fieldId: number) => {
    const data = await getFieldMetaData(fieldId);
    if (data?.result) {
      setFieldData(data.result);
      reset(data.result);
      onFieldDataChange(data.result);
    }
  };

  useEffect(() => {
    if (fieldData?.fieldId) {
      fetchFieldData(fieldData.fieldId);
    }
  }, [fieldData?.fieldId]);

  const handleFormSubmit = async (data) => {
    // Handle form submission (e.g., send data to server)
    console.log("Form data submitted:", data);
    await createFarmFieldLink(data.cropperRef, data.farmId);
          //navigate("/");
  };

  const fieldDefinitions = {
    fieldDetails: [{ id: "name", label: "Field Name", type: "text" }],
    irrDry: [{ id: "irrDry", label: "Irrigated Field", type: "checkbox" }],
    farm: [
      {
        id: "farmId",
        label: "Farm",
        type: "select",
        options: farms.map((farm) => ({
          value: farm.farmIdentifier,
          label: farm.farm,
          id: farm.farmId,
        })),
      },
    ],

    seasonalField: [
      { id: "seasonalField", label: "Seasonal Field", type: "checkbox" },
    ],
    fieldHistory: [
      { id: "activities", label: "Activities", type: "text" },
      { id: "cropHistory", label: "Crop History", type: "text" },
      { id: "notes", label: "Notes", type: "text" },
    ],
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{ marginTop: 1, padding: 1, minHeight: "510px" }}
      >
        <Typography variant="h6">Field Details</Typography>
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogContent>
            <Grid container spacing={2} sx={{ padding: 2 }}>
              <FormSection
                fields={fieldDefinitions.fieldDetails}
                control={control}
                errors={errors}
                columns={1}
                title=""
              />
              <Controller
                name="metadata.irrDry"
                control={control}
                render={({ field }) => {
                  return (
                    <FormControlLabel
                      control={
                        <Checkbox
                          {...field}
                          checked={field.value === "Irrigated"}
                          onChange={(e) => {
                            field.onChange(
                              e.target.checked ? "Irrigated" : "Dry"
                            );
                          }}
                          color="primary"
                        />
                      }
                      label="Irrigated Field"
                    />
                  );
                }}
              />

              <FormSection
                title=""
                fields={fieldDefinitions.farm}
                control={control}
                errors={errors}
                columns={1}
              />

              <Controller
                name="seasonalField"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value}
                        onChange={(e) => field.onChange(e.target.checked)}
                        color="primary"
                      />
                    }
                    label="Seasonal Field"
                  />
                )}
              />
              <FormSection
                fields={fieldDefinitions.fieldHistory}
                control={control}
                errors={errors}
                columns={1}
                title=""
              />
            </Grid>
            <Button variant="contained" color="primary" type="submit">
              SAVE
            </Button>
          </DialogContent>
        </form>
      </Paper>
    </>
  );

  // return (
  //   <Paper elevation={3} sx={{ marginTop: 1, padding: 1, minHeight: "510px" }}>
  //     <Typography variant="h6">Field Details</Typography>
  //     <form onSubmit={handleSubmit}>
  //       <Box sx={{ overflow: "auto" }}>
  //         <TextBox
  //           label="Field Name"
  //           value={formData.name}
  //           onChange={handleChange}
  //           sx={{ marginTop: 1 }}
  //         />
  //         <TextBox
  //           label="Size"
  //           value={formData.size}
  //           onChange={handleChange}
  //           sx={{ marginTop: 1 }}
  //         />
  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               checked={formData.irrigated}
  //               onChange={handleChange}
  //               name="irrigated"
  //               color="primary"
  //             />
  //           }
  //           label="Irrigated Field"
  //         />

  //         <Dropdown
  //           label="Farm"
  //           name="farm"
  //           value={fieldData?.farmId}
  //           items={farmItems}
  //           onChange={handleDropdownChange}
  //         ></Dropdown>

  //         <FormControlLabel
  //           control={
  //             <Checkbox
  //               checked={formData.seasonalField}
  //               onChange={handleChange}
  //               name="seasonalField"
  //               color="primary"
  //             />
  //           }
  //           label="Seasonal Field"
  //         />
  //         <TextBox
  //           label="Activities"
  //           //name="activities"
  //           value={formData.activities}
  //           onChange={handleChange}
  //           sx={{ marginTop: 1 }}
  //           multiline
  //           rows={1.5}
  //         />
  //         <TextBox
  //           label="Crop History"
  //           //name="cropHistory"
  //           value={formData.cropHistory}
  //           onChange={handleChange}
  //           sx={{ marginTop: 1 }}
  //         />
  //         <TextBox
  //           label="Notes"
  //           //name="notes"
  //           value={formData.notes}
  //           onChange={handleChange}
  //           sx={{ marginTop: 1 }}
  //           multiline
  //           rows={1.5}
  //         />
  //         <Button type="submit" variant="contained" color="primary">
  //           Save
  //         </Button>
  //       </Box>
  //     </form>
  //   </Paper>
  // );
};

export default FieldForm;
