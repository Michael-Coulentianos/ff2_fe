import React from 'react';
import { Controller } from 'react-hook-form';
import { Grid, Typography, MenuItem } from '@mui/material';
import Textbox from '../atom/textBox';
import AttachmentButton from '../atom/AttachmentButton';
import FieldMapComponent from './FieldMapComponent';
import ColoredRadio from './ColoredRadio';

const DynamicFormSection = ({ title = "", fields, control, errors, columns = 1 }) => {
  const gridColumnWidth = Math.floor(12 / columns);

  return (
    <React.Fragment>
      <Grid container alignItems="center" spacing={2}>
        {title && (
          <Grid item xs={12}>
            <Typography variant="h6" style={{ marginBottom: 4 }}>
              {title}
            </Typography>
          </Grid>
        )}
        {fields.map((field) => (
          <Grid item xs={12} sm={gridColumnWidth} key={field.id}>
            <Controller
              name={field.id}
              control={control}
              defaultValue=""
              render={({ field: { onChange, onBlur, value, ref } }) => {
                let FieldComponent = <Textbox id={field.id} label={field.label} placeholder={field.placeholder} type={field.type} value={value} onChange={onChange} onBlur={onBlur} error={!!errors[field.id]} helperText={errors[field.id]?.message} inputRef={ref} />;

                switch (field.type) {
                  case "select":
                    FieldComponent = (
                      <Textbox
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
                        {field.options?.map((option) => (
                          <MenuItem key={option.value} value={option.value}>
                            {option.label}
                          </MenuItem>
                        ))}
                      </Textbox>
                    );
                    break;
                  case "radioGroup":
                    FieldComponent = <ColoredRadio />;
                    break;
                  case "attachment":
                    FieldComponent = <AttachmentButton onClick={function (): void {
                      throw new Error('Function not implemented.');
                    } } />;
                    break;
                  case "map":
                    FieldComponent = <FieldMapComponent />;
                    break;
                }
                return FieldComponent;
              }}
            />
          </Grid>
        ))}
      </Grid>
    </React.Fragment>
  );
};

export default DynamicFormSection;
