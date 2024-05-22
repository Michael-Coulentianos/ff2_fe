import React from "react";
import { Controller } from "react-hook-form";
import { Grid, Typography, MenuItem, IconButton, Tooltip } from "@mui/material";
import ColoredRadio from "./ColoredRadio";
import DateSelector from "../atom/dateSelect";
import AddAttachmentButton from "../atom/attachmentButton";
import TextBox from "../atom/textBox";
import MapComponent from "../organisms/locationMap";
import GoogleMapsSearchBar from "../atom/googleMapsSearchBar";
import DateRangePicker from "../atom/dateRange";
import AddIcon from "@mui/icons-material/Add";
import theme from "../../theme";
import MyMapComponent from "./googleMaps";

interface Field {
  id: string;
  label: string;
  type?: string;
  options?: Array<{ label: string; value: any; id: any }>;
  placeholder?: string;
}

interface DynamicFormSectionProps {
  title?: string;
  fields: Field[];
  control: any;
  errors: any;
  columns?: number;
  onFileChange?: (file: File | null) => void;
  onClick?: () => void;
  onPositionChange?: (position: { lat: number; lng: number }) => void;
  onLocationSelect?: any;
}

const DynamicFormSection: React.FC<DynamicFormSectionProps> = ({
  title = "",
  fields,
  control,
  errors,
  columns = 1,
  onFileChange = () => {},
  onClick,
  onPositionChange = () => {},
  onLocationSelect,
}) => {
  const gridColumnWidth = Math.floor(12 / columns);

  return (
    <React.Fragment>
      <Grid container spacing={1}>
        {title && (
          <Grid item xs={12}>
            <Typography variant="subtitle1" style={{ marginBottom: 1 }}>
              {title}
            </Typography>
          </Grid>
        )}
        {fields?.map((field) => (
          <Grid item xs={12} sm={gridColumnWidth} key={field.id}>
            <Controller
              name={field.id}
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value, ref } }) => {
                switch (field.type) {
                  case "select":
                    return (
                      <TextBox
                        select
                        id={field.id}
                        label={field.label}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors[field.id]}
                        helperText={errors[field.id]?.message}
                        inputRef={ref}
                      >
                        {Array.isArray(field.options) ? (
                          field.options.map((option) => (
                            <MenuItem key={option.id} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No Options Available</MenuItem>
                        )}
                      </TextBox>
                    );
                  case "selectAdd":
                    return (
                      <Grid container>
                        <Grid item xs={10.5}>
                          <TextBox
                            select
                            id={field.id}
                            label={field.label}
                            value={value}
                            onChange={onChange}
                            onBlur={onBlur}
                            error={!!errors[field.id]}
                            helperText={errors[field.id]?.message}
                            inputRef={ref}
                          >
                            {Array.isArray(field.options) ? (
                              field.options.map((option) => (
                                <MenuItem key={option.id} value={option.value}>
                                  {option.label}
                                </MenuItem>
                              ))
                            ) : (
                              <MenuItem disabled>No Options Available</MenuItem>
                            )}
                          </TextBox>
                        </Grid>
                        <Grid item xs={1.5}>
                          <Tooltip title="New Note">
                            <IconButton
                              aria-label="add"
                              sx={{
                                color: "white",
                                backgroundColor: theme.palette.secondary.main,
                                width: "30px",
                                height: "30px",
                                margin: "10px",
                                "&:hover": {
                                  backgroundColor:
                                    theme.palette.secondary.light,
                                },
                              }}
                              onClick={onClick}
                            >
                              <AddIcon />
                            </IconButton>
                          </Tooltip>
                        </Grid>
                      </Grid>
                    );
                  case "radioGroup":
                    return (
                      <ColoredRadio
                        id={field.id}
                        value={value}
                        onChange={onChange}
                        error={!!errors[field.id]}
                        helperText={errors[field.id]?.message}
                      />
                    );
                  case "attachment":
                    return (
                      <AddAttachmentButton
                        id={field.id}
                        label={field.label}
                        onChange={onFileChange}
                        onBlur={onBlur}
                        error={!!errors[field.id]}
                        helperText={errors[field.id]?.message}
                      />
                    );
                  case "map":
                    return (
                      <MapComponent
                        id={field.id}
                        label={field.label}
                        error={!!errors.location}
                        helperText={errors.location?.message}
                        onPositionChange={onPositionChange}
                      />
                    );
                  case "multiText":
                    return (
                      <TextBox
                        id={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors[field.id]}
                        helperText={errors[field.id]?.message}
                        multiline
                        rows={2}
                      />
                    );
                  case "date":
                    return (
                      <DateSelector
                        id={field.id}
                        value={value}
                        label={field.label}
                        onChange={onChange}
                      ></DateSelector>
                    );
                  case "googleMapsSearch":
                    return (
                      <MyMapComponent
                        onLocationSelect={onLocationSelect}
                      ></MyMapComponent>
                    );
                  case "dateRange":
                    return <DateRangePicker></DateRangePicker>;
                  default:
                    return (
                      <TextBox
                        id={field.id}
                        label={field.label}
                        placeholder={field.placeholder}
                        type={field.type}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors[field.id]}
                        helperText={errors[field.id]?.message}
                      />
                    );
                }
              }}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default DynamicFormSection;
