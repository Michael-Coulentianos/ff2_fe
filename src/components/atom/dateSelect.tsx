import { TextField } from "@mui/material";
import React from "react";

interface DateProps {
  id?: string;
  label: string;
  value: string | number | readonly string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onBlur?: () => void;
  readOnly?: boolean;
  error?: boolean;
  helperText?: any;
}

const DateSelector: React.FC<DateProps> = ({
  id,
  label,
  value,
  helperText,
  onChange,
  onBlur,
  error,
}) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    fullWidth
    variant="outlined"
    size="small"
    margin="dense"
    helperText={helperText}
    error={error}
    id={id}
    type="date"
    onBlur={onBlur}
    InputLabelProps={{
      shrink: true,
    }}
  >
  </TextField>
);

export default DateSelector;
