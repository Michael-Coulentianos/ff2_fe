import {
  FormControlLabel,
  Checkbox,
  Button,
  Grid,
  DialogContent,
  Paper,
  Typography,
  TextField,
  Box,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { getOrganizationFarms, getOrganizations } from "../../api-ffm-service";
import { fetchData, useFetchData } from "../../hooks/useFethData";
import { Farm } from "../../models/farm.interface";
import { useGlobalState } from "../../GlobalState";
import {
  createFarmFieldLink,
  createFarmFieldLinkCropperRef,
  createField,
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

const FieldForm = ({ initialFieldData, onFieldDataChange, polygonData }) => {
  const navigate = useNavigate();
  const { selectedOrganization } = useGlobalState();
  const [farms, setFarms] = useState<Farm[]>([]);
  useFetchData(getOrganizationFarms, setFarms, undefined, [
    selectedOrganization?.organizationId ?? 0,
  ]);

  const [fieldData, setFieldData] = useState(initialFieldData || {});
  const {
    control,
    handleSubmit,
    reset,
    setValue,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
    defaultValues: {
      farmId: fieldData?.farmId || "",
    },
  });

  const fetchFieldData = async (fieldId) => {
    const data = await getFieldMetaData(fieldId);
    if (data) {
      setFieldData(data);
      reset(data);
      onFieldDataChange(data);
    }
  };

  useEffect(() => {
    if (initialFieldData?.area) {
      const size = initialFieldData.area;
      setValue("size", size + " ha");
    }
  }, [initialFieldData, setValue]);

  useEffect(() => {
    if (fieldData?.fieldId) {
      fetchFieldData(fieldData.fieldId);
    }
  }, [fieldData?.fieldId]);

  useEffect(() => {
    if (polygonData) {
      const size = polygonData.area;
      setValue("size", size);
    }
  }, [polygonData, setValue]);

  function roundCoordinates(coords: number[][][]): number[][][] {
    return coords.map((coordGroup) =>
      coordGroup.map(([lat, long]) => [
        parseFloat(lat.toFixed(4)),
        parseFloat(long.toFixed(4)),
      ])
    );
  }

  const existingFieldCoordinates = () => {
    let coords = "";
    if (polygonData?.coordinates === undefined) {
      coords = initialFieldData.coords;
    } else if (polygonData.coordinates !== undefined) {
      const roundedCoords = roundCoordinates(polygonData.coordinates);
      coords = JSON.stringify(roundedCoords);
    }
    return coords;
  };
  const [organizations, setOrganizations] = useState<any[]>([]);

  const handleFormSubmit = async (data) => {
    const farmId = data.farmId === "" ? null : data.farmId;

    let coords = existingFieldCoordinates();

    const cropperRef = generateGUID();

    await fetchData(getOrganizations, setOrganizations);
    const updatedOrganizations = await getOrganizations();

    if (data.fieldId === undefined) {
      const fieldMetadata: FieldMetadata = {
        cropperRef: cropperRef,
        coords: coords,
        partyId: updatedOrganizations[0]?.partyIdentifier,
        name: data.name,
        metadata: {
          irrDry: data.irrDry,
        },
      };
      console.log(fieldMetadata);

      await createField(fieldMetadata);
      await createFarmFieldLinkCropperRef(cropperRef, farmId);
    } else {
      const fieldMetadata: FieldMetadata = {
        fieldId: data.fieldId,
        coords: coords,
        partyId: updatedOrganizations[0]?.partyIdentifier,
        name: data.name,
        metadata: {
          irrDry: data.irrDry,
        },
      };

      await updateField(fieldMetadata);
      await createFarmFieldLink(data.fieldId, farmId);
      navigate("/");
    }
  };

  function generateGUID(): string {
    return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(
      /[xy]/g,
      function (c) {
        const r = (Math.random() * 16) | 0;
        const v = c === "x" ? r : (r & 0x3) | 0x8;
        return v.toString(16);
      }
    );
  }

  const fieldDefinitions = {
    fieldDetails: [
      { id: "name", label: "Field Name", type: "text" },
      { id: "size", label: "Size", type: "text" },
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
    <Paper elevation={3} sx={{ marginTop: 1, padding: 1, minHeight: "510px" }}>
      <Typography variant="h6">Field Details</Typography>
      <form onSubmit={handleSubmit(handleFormSubmit)}>
        <Box sx={{ overflow: "auto" }}>
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
        </Box>
        <Button variant="contained" color="primary" type="submit">
          SAVE
        </Button>
      </form>
    </Paper>
  );
};

export default FieldForm;
