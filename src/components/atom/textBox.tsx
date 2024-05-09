import React from "react";
import { TextField } from "@mui/material";

interface TextBoxProps {
  id?: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: string | number | readonly string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  readOnly?: boolean;
  error?: boolean;
  helperText?: any;
  multiline?: boolean;
  rows?: number;
  fullWidth?: boolean;
  disabled?: boolean;
  select?: boolean;
  children?: React.ReactNode;
  inputRef?: React.Ref<any>;
}

const TextBox: React.FC<TextBoxProps> = ({
  id,
  label,
  placeholder,
  type = "text",
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
  readOnly,
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
    size="small"
    margin="dense"
    error={error}
    helperText={helperText}
    multiline={multiline || Boolean(rows)}
    rows={rows}
    id={id}
    placeholder={placeholder}
    type={type}
    onBlur={onBlur}
    inputRef={inputRef}
    //readOnly={readOnly}
  >
    {select && children}
  </TextField>
);

export default TextBox;
