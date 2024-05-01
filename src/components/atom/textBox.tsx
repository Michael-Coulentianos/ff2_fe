import React from 'react';
import { TextField } from '@mui/material';

interface TextBoxProps {
  id?: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: any;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  error?: boolean;
  helperText?: any;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  select?: boolean;
  children?: any;
  inputRef?: any;
}

const TextBox: React.FC<TextBoxProps> = ({
  id,
  label,
  placeholder,
  type = 'text',
  value,
  onChange,
  onBlur,
  error,
  helperText,
  multiline,
  rows,
  fullWidth = true,
  disabled,
  select,
  children,
  inputRef,
}) => (
  <TextField
    select={select}
    label={label}
    value={value}
    onChange={onChange}
    fullWidth={fullWidth}
    disabled={disabled}
    variant="outlined"
    size={select ? "small" : "medium"}
    margin={select ? "dense" : "normal"}
    error={error}
    helperText={helperText}
    multiline={multiline || !!rows}
    rows={rows}
    id={id}
    placeholder={placeholder}
    type={type}
    onBlur={onBlur}
    inputRef={inputRef}
  >
    {children}
  </TextField>
);

export default TextBox;
