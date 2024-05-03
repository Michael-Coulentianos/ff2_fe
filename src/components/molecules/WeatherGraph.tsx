import { Paper } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";

const WeatherGraph: React.FC = () => {
  return (
    <Paper
      elevation={2}
      sx={{ backgroundColor: "white", marginTop: 1 }}
    >
      <Iframe
        url="https://app-fieldmaptool-qa.azurewebsites.net/chart/ce2ad131-7f99-2b3d-a67b-b8513246b723/weather/"
        width="100%"
        height="460px"
        display="initial"
        position="relative"
        frameBorder={0}
        scrolling="auto"
      />
    </Paper>
  );
};

export default WeatherGraph;
