import React from 'react';
import { TextField } from '@mui/material';

function FormControl({ id, label, type="text", placeholder }) {
  return (
    <TextField
      fullWidth
      id={id}
      label={label}
      type={type}
      placeholder={placeholder}
      variant="outlined"
      margin="normal"
    />
  );
}

export default FormControl;
