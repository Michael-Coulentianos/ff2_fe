import React from "react";
import {
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  SelectChangeEvent,
} from "@mui/material";


interface DropdownItem {
  value: string | number;
  label: string;
}

interface DropdownProps {
  label: string;
  name: string;
  value: string | number;
  items: DropdownItem[];
  sx?: any;
  onChange: (event: SelectChangeEvent<string | number>) => void;
}

const Dropdown: React.FC<DropdownProps> = ({
  label,
  name,
  value,
  items,
  onChange,
  sx,
  ...props
}) => {
  return (
    <FormControl fullWidth>
      <InputLabel id={`${name}-select-label`}>{label}</InputLabel>
      <Select
        labelId={`${name}-select-label`}
        id={`${name}-select`}
        name={name}
        value={value}
        label={label}
        onChange={onChange}
        {...props}
        variant="outlined"
        size="small"
        margin="dense"
        sx={sx}
      >
        {items.map((item) => (
          <MenuItem key={item.value} value={item.value}>
            {item.label}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default Dropdown;
