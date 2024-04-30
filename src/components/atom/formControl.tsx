import React from 'react';
import { TextField } from '@mui/material';

interface FormControlProps {
  id: string;
  label: string;
  placeholder: string;
  type?: string;
  value?: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: string;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
}

function FormControl({
  id,
  label,
  placeholder,
  type = 'text',
  value = '',
  onChange,
  onBlur,
  error,
  helperText,
  multiline,
  rows,
  fullWidth = true 
}: FormControlProps) {
  return (
    <TextField
      fullWidth={fullWidth}
      id={id}
      label={label}
      placeholder={placeholder}
      type={type}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      error={error}
      helperText={helperText}
      multiline={multiline || !!rows}
      rows={rows}
      variant="outlined"
      margin="normal"
    />
  );
}

export default FormControl;
