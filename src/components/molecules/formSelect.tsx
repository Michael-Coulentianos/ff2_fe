import React from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

function FormSelect({ label, items, ...props }) {
  return (
    <FormControl fullWidth variant="outlined" margin="normal">
      <InputLabel>{label}</InputLabel>
      <Select label={label} {...props}>
        {items.map(item => (
          <MenuItem key={item.value} value={item.value}>{item.label}</MenuItem>
        ))}
      </Select>
    </FormControl>
  );
}

export default FormSelect;
