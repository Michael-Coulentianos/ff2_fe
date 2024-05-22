import { Paper } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";
import { useGlobalState } from '../../GlobalState';

interface FieldMapProps {
  height: string;
}

const FieldMapComponent: React.FC<FieldMapProps> = ({ height }) => {
  const { activeAccount } = useGlobalState();
  const azureUserId = activeAccount?.localAccountId;

  const mapUrl = `https://app-fieldmaptool-dev.azurewebsites.net/field/${azureUserId}`;

  return (
    <Paper elevation={2} sx={{ backgroundColor: "white", margin: 1 }}>
      <Iframe
        url={mapUrl}
        width="100%"
        height={height}
        display="initial"
        position="relative"
        frameBorder={0}
      />
    </Paper>
  );
};

export default FieldMapComponent;
