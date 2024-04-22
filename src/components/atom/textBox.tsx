import { TextField } from "@mui/material";
import { error } from "console";

interface TextBoxProps {
  label: string;
  value: any;
  onChange: any;
  disabled?: boolean;
  helperText?: any;
  error?: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  value,
  onChange,
  disabled,
  helperText,
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
  />
);
export default TextBox;
