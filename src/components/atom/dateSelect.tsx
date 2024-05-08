import { TextField } from "@mui/material";
import React, { useState } from "react";

const DateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  return (
    <TextField
      variant="outlined"
      size="small"
      margin="dense"
      fullWidth
      label="Date"
      type="date"
      name="endDate"
      value={selectedDate}
      onChange={handleDateChange}
      InputLabelProps={{
        shrink: true,
      }}
    />
  );
};

export default DateSelector;
