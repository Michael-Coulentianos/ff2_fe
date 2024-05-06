import { Paper } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";

const FieldMapComponent: React.FC = () => {
  return (
    <Paper elevation={2} sx={{ backgroundColor: "white", margin: 1 }}>
      <Iframe
        url="https://app-fieldmaptool-qa.azurewebsites.net/field/ce2ad131-7f99-2b3d-a67b-b8513246b723/bd4d51fd-bb76-4bb0-8ec1-a7978a139974"
        width="100%"
        height="230px"
        id="myId"
        className="myClassname"
        display="initial"
        position="relative"
        frameBorder={0}
      />
    </Paper>
  );
};

export default FieldMapComponent;
