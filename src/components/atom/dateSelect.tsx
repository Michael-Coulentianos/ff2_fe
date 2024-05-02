import React, { useState } from "react";
import { Typography, Button, Container, Grid } from "@mui/material";

const DateSelector: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSelectedDate(event.target.value);
  };

  const handleSubmit = () => {
    if (selectedDate) {
      // Here you can perform further actions with the selected date
      console.log("Selected date:", selectedDate);
    }
  };

  const customDatepickerStyle: React.CSSProperties = {
    padding: "8px",
    fontSize: "16px",
    borderRadius: "4px",
    border: "1px solid #bdbdbd",
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    width: "100%",
    boxSizing: "border-box",
    backgroundColor: "#fff",
    transition: "border-color 0.2s",
    outline: "none",
    marginTop: "8px",
  };

  return (
    <input
      style={customDatepickerStyle}
      type="date"
      value={selectedDate}
      onChange={handleDateChange}
    />
  );
};

export default DateSelector;