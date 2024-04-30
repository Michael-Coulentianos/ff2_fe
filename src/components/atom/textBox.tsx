import { TextField } from "@mui/material";

interface TextBoxProps {
  id?: string;
  label: string;
  placeholder?: string;
  type?: string;
  value: any;
  onChange: any;
  disabled?: boolean;
  helperText?: any;
  rows?: number;
  multiline?: boolean;
  error?: boolean;
  select?: boolean;
  children?: any;
  onBlur?: () => void;
  inputRef?: any;
}

const TextBox: React.FC<TextBoxProps> = ({
  id,
  label,
  placeholder,
  type,
  value,
  onChange,
  onBlur,
  disabled,
  rows,
  helperText,
  multiline,
  error,
  children,
  select,
  inputRef,
}) => (
  <TextField
    select={select}
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
