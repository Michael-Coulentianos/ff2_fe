import React from "react";
import { Controller } from "react-hook-form";
import { Grid, Typography, MenuItem } from "@mui/material";
import ColoredRadio from "./ColoredRadio";
import DateSelector from "../atom/dateSelect";
import AddAttachmentButton from "../atom/attachmentButton";
import TextBox from "../atom/textBox";
import MapComponent from "../organisms/locationMap";
import GoogleMapsSearchBar from "../atom/googleMapsSearchBar";

import DateRangePicker from "../atom/dateRange";

const DynamicFormSection = ({
  title = "",
  fields,
  control,
  errors,
  columns = 1,
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
                            <MenuItem key={option.value} value={option.value}>
                              {option.label}
                            </MenuItem>
                          ))
                        ) : (
                          <MenuItem disabled>No Options Available</MenuItem>
                        )}
                      </TextBox>
                    );
                  case "radioGroup":
                    return <ColoredRadio />;
                  case "attachment":
                    return <AddAttachmentButton
                      id={field.id}
                      label={field.label}
                      onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
                        const file = event.target.files ? event.target.files[0] : null;
                        console.log("File attached:", file ? file.name : "No file"); 
                        onChange(file);
                      }}
                      onBlur={onBlur}
                      error={!!errors[field.id]}
                      helperText={errors[field.id]?.message}
                  />
                  case "map":
                    return (
                      <MapComponent
                        id={field.id}
                        label={field.label}
                        error={!!errors.location}
                        helperText={errors.location?.message}
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
                    return <DateSelector></DateSelector>;
                  case "googleMapsSearch":
                    return (
                      <GoogleMapsSearchBar
                        onAddressSelected={(address) => {
                          onChange(address);
                        }}
                      />
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
