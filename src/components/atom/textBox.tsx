import { TextField } from "@mui/material";

interface TextBoxProps {
  label: string;
  value: any;
  onChange: any;
  disabled?: boolean;
}

const TextBox: React.FC<TextBoxProps> = ({
  label,
  value,
  onChange,
  disabled,
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
  />
);
export default TextBox;
