import React from 'react';
import { Select, MenuItem, FormControl, InputLabel, SelectChangeEvent } from '@mui/material';

// Define the type for each item in the dropdown list
interface DropdownItem {
  value: string | number;
  label: string;
}

// Define the props interface
interface DropdownProps {
  label: string;
  name: string;
  value: string | number;
  items: DropdownItem[];
  onChange: (event: SelectChangeEvent<string | number>) => void;
}

// Create the Dropdown component as a React Functional Component
const Dropdown: React.FC<DropdownProps> = ({ label, name, value, items, onChange, ...props }) => {
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
        displayEmpty
        {...props}
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
