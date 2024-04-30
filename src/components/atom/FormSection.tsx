import React from "react";
import { Controller } from "react-hook-form";
import { Grid, Typography, TextField, MenuItem } from "@mui/material";
import TextBox from "./textBox";
import ColoredRadio from "../molecules/coloredRadioBtns";
import AddAttachmentButton from "./attachmentButton";
import MapComponent from "../organisms/locationMap";

const FormSection = ({
  title,
  fields,
  control,
  errors,
  columns = 1,
  onAttachmentClick = () => {},
}) => {
  const gridColumnWidth = Math.floor(12 / columns);

  return (
    <React.Fragment>
      <Grid container alignItems="center" spacing={1}>
        <Grid item xs={12}>
          <Typography variant="subtitle1" style={{ marginBottom: 1 }}>
            {title}
          </Typography>
        </Grid>
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
                        label={field.label}
                        value={value}
                        onChange={onChange}
                        onBlur={onBlur}
                        error={!!errors[field.id]}
                        helperText={errors[field.id]?.message}
                        inputRef={ref}
                      >
                        {field?.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </TextBox>
                    );
                  case "radioGroup":
                    return <ColoredRadio />;
                  case "attachment":
                    return (
                      <AddAttachmentButton onClick={() => onAttachmentClick} />
                    );
                  case "map":
                    return (
                      <MapComponent
                        label="Location"
                        error={!!errors.location}
                        helperText={errors.location?.message}
                      />
                    );
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

export default FormSection;
