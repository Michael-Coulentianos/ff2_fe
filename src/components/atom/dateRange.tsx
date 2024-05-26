import { Grid, TextField } from "@mui/material";
import React, { useState } from "react";

const DateRangePicker: React.FC = () => {
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");

  const handleDateChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    if (name === "startDate") {
      setStartDate(value);
    } else if (name === "endDate") {
      setEndDate(value);
    }
  };

  return (
    <Grid container>
      <Grid item xs={6} sx={{ paddingRight: "3px" }}>
        <TextField
          variant="outlined"
          size="small"
          margin="dense"
          fullWidth
          label="Start Date"
          type="date"
          name="startDate"
          value={startDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
      <Grid item xs={6} sx={{ paddingLeft: "3px" }}>
        <TextField
          variant="outlined"
          size="small"
          margin="dense"
          fullWidth
          label="End Date"
          type="date"
          name="endDate"
          value={endDate}
          onChange={handleDateChange}
          InputLabelProps={{
            shrink: true,
          }}
        />
      </Grid>
    </Grid>
  );
};

export default DateRangePicker;
