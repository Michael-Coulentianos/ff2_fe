import React from "react";
import { TextField, InputAdornment } from "@mui/material";

interface TextBoxProps {
  id?: string;
  label: string;
  placeholder?: string;
  type?: string; // 'text', 'number', 'decimal', or 'currency'
  value: string | number;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: (event: React.FocusEvent<HTMLInputElement>) => void;
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
  children,
  inputRef,
}) => {
  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    let { value } = event.target;
    if (type === "number" || type === "decimal" || type === "currency") {
      const regex = type === "currency" ? /^-?\d*\.?\d{0,2}$/ : /^-?\d*\.?\d*$/;
      if (regex.test(value)) {
        onChange(event);
      }
    } else {
      onChange(event);
    }
  };

  const handleBlur = (event: React.FocusEvent<HTMLInputElement>) => {
    if (type === "currency" && event.target.value) {
      const value = parseFloat(event.target.value);
      event.target.value = value.toFixed(2); // Ensure value is always with two decimal places
      onChange(event);
    }
    if (onBlur) {
      onBlur(event);
    }
  };

  return (
    <TextField
      select={select}
      label={label}
      value={value}
      onChange={handleInput}
      onBlur={handleBlur}
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
      type={type === "decimal" || type === "currency" ? "text" : type}
      inputRef={inputRef}
      InputProps={{
        startAdornment: type === "currency" ? (
          <InputAdornment position="start">R</InputAdornment>
        ) : undefined,
        inputProps: {
          min: (type === "number" || type === "currency") ? 0 : undefined,
          step: (type === "decimal" || type === "currency") ? "0.01" : undefined,
        },
      }}
    >
      {select && children}
    </TextField>
  );
};

export default TextBox;
