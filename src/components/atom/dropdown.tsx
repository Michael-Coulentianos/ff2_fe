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
  items: DropdownItem[];
}

// Create the StaticDropdown component as a React Functional Component
const Dropdown: React.FC<DropdownProps> = ({ label, items, ...props }) => {
  const [value, setValue] = React.useState<string | number>(''); // Default to empty string for no selection

  const handleChange = (event: SelectChangeEvent<string | number>) => {
    setValue(event.target.value);
  };

  return (
    <FormControl fullWidth>
      <InputLabel id="select-label">{label}</InputLabel>
      <Select
        labelId="select-label"
        id="select"
        value={value}
        label={label}
        onChange={handleChange}
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
