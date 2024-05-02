import React from "react";
import {
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from "@mui/material";

const ColoredRadio = () => {
  return (
    <FormControl component="fieldset" sx={{ marginBottom: 2, marginTop: 1 }}>
      <FormLabel>Risk Percentage</FormLabel>
      <RadioGroup row>
        <FormControlLabel
          value="0-20%"
          control={
            <Radio
              sx={{
                color: "#6F884B",
                "& .MuiSvgIcon-root": { fontSize: 40 },
                "&.Mui-checked": { color: "#6F884B" },
              }}
            />
          }
          label="0-20%"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="21-40%"
          control={
            <Radio
              sx={{
                color: "#34B6A8F",
                "& .MuiSvgIcon-root": { fontSize: 40 },
                "&.Mui-checked": { color: "#4B6A8F" },
              }}
            />
          }
          label="21-40%"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="41-60%"
          control={
            <Radio
              sx={{
                color: "#F1A81E",
                "& .MuiSvgIcon-root": { fontSize: 40 },
                "&.Mui-checked": { color: "#F1A81E" },
              }}
            />
          }
          label="41-60%"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="61-80%"
          control={
            <Radio
              sx={{
                color: "#C96421",
                "& .MuiSvgIcon-root": { fontSize: 40 },
                "&.Mui-checked": { color: "#C96421" },
              }}
            />
          }
          label="61-80%"
          labelPlacement="bottom"
        />
        <FormControlLabel
          value="81-100%"
          control={
            <Radio
              sx={{
                color: "#DC3545",
                "& .MuiSvgIcon-root": { fontSize: 40 },
                "&.Mui-checked": { color: "#DC3545" },
              }}
            />
          }
          label="81-100%"
          labelPlacement="bottom"
        />
      </RadioGroup>
    </FormControl>
  );
};

export default ColoredRadio;
