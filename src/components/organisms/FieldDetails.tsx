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
import {
  createFarmFieldLink,
  getFieldMetaData,
  updateField,
} from "../../api-gs-service";
import { Controller, useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import FormSection from "../molecules/DynamicFormSection";
import { useNavigate } from "react-router-dom";
import { FieldMetadata } from "../../models/fieldMetadata.interface";

const validationSchema = yup.object({
  name: yup.string().required(),
  size: yup.string().optional(),
  irrDry: yup.string().oneOf(["Irrigated", "Non-Irrigated", "Dry"]).optional(),
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
      farmId: fieldData?.farmId || ""
    },
  });

  const fetchFieldData = async (fieldId: number) => {
    const data = await getFieldMetaData(fieldId);
    if (data) {
      setFieldData(data);
      reset(data);
      onFieldDataChange(data);
    }
  };

  useEffect(() => {
    if (fieldData?.fieldId) {
      fetchFieldData(fieldData.fieldId);
    }
  }, [fieldData?.fieldId]);

  const handleFormSubmit = async (data) => {
    const farmId = data.farmId === "" ? null : data.farmId;
    // Handle form submission (e.g., send data to server)
    console.log("Form data submitted:", data);
    console.log("fieldId:", data.fieldId);
    console.log("farmId:", farmId);
    await createFarmFieldLink(data.fieldId, farmId);

    const exampleFieldMetadata: FieldMetadata = {
      fieldId: data.fieldId,
      coords: data.coords,
      partyId: data.partyId,
      name: data.name,
      metadata: {
        irrDry: data.irrDry
      }
    };

    console.log(exampleFieldMetadata);

    await updateField(exampleFieldMetadata);
    navigate("/");
  };

  const fieldDefinitions = {
    fieldDetails: [
      { id: "name", label: "Field Name", type: "text" },
      { id: "area", label: "Size", type: "text" },
    ],
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
                name="irrDry"
                control={control}
                render={({ field }) => (
                  <FormControlLabel
                    control={
                      <Checkbox
                        {...field}
                        checked={field.value === "Irrigated"}
                        onChange={(e) =>
                          field.onChange(e.target.checked ? "Irrigated" : "Dry")
                        }
                        color="primary"
                      />
                    }
                    label="Irrigated Field"
                  />
                )}
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
};

export default FieldForm;
