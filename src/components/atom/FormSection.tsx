import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, Typography, TextField, MenuItem } from '@mui/material';
import FormControl from './formControl';

const FormSection = ({ title, fields, control, errors, columns = 1 }) => {
  const gridColumnWidth = Math.floor(12 / columns);

  return (
    <React.Fragment>
      <Grid container alignItems="center" spacing={2}>
        <Grid item xs={12}>
          <Typography variant="h6" style={{ marginBottom: 8 }}>
            {title}
          </Typography>
        </Grid>
        {fields.map((field) => (
          <Grid item xs={12} sm={gridColumnWidth} key={field.id}>
            <Controller
              name={field.id}
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value, ref } }) => {
                if (field.type === 'select') {
                  return (
                    <TextField
                      select
                      label={field.label}
                      fullWidth
                      margin="dense"
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors[field.id]}
                      helperText={errors[field.id]?.message}
                      inputRef={ref}
                    >
                      {field.options.map((option) => (
                        <MenuItem key={option.value} value={option.value}>
                          {option.label}
                        </MenuItem>
                      ))}
                    </TextField>
                  );
                } else {
                  return (
                    <FormControl
                      id={field.id}
                      label={field.label}
                      placeholder={field.placeholder}
                      type={field.type}
                      value={value}
                      onChange={onChange}
                      onBlur={onBlur}
                      error={!!errors[field.id]}
                      helperText={errors[field.id]?.message}
                      fullWidth
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

