import { TextField } from "@mui/material";

interface TextBoxProps {
  label: string;
  value: any;
  onChange: any;
  disabled?: boolean;
  helperText?: any;
  rows?: number;
  multiline?: boolean;
  error?: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  value,
  onChange,
  disabled,
  rows,
  helperText,
  multiline,
  error,
}) => (
  <TextField
    label={label}
    value={value}
    onChange={onChange}
    fullWidth
    disabled={disabled}
    variant="outlined"
    size="small"
    margin="dense"
    error={error}
    helperText={helperText}
    multiline={multiline || !!rows}
    rows={rows} 
  />
);

export default TextBox;
