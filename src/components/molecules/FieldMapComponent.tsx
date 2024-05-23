import { Paper } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";
import { useGlobalState } from "../../GlobalState";

interface FieldMapProps {
  height: string;
  fieldData?: any;
}

const FieldMapComponent: React.FC<FieldMapProps> = ({ height, fieldData }) => {
  const { selectedOrganization, activeAccount } = useGlobalState();
  const azureUserId = activeAccount?.localAccountId;

  const cropperRef = fieldData?.cropperRef;
  const partyIdentifier = selectedOrganization?.partyIdentifier;
  let mapUrl = ""
  if (cropperRef !== undefined){
  mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${partyIdentifier}/${cropperRef}`;
} else 
{
  mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${partyIdentifier}`;

}
  return (
    <Paper elevation={2} sx={{ backgroundColor: "white", margin: 1, p: 0.2 }}>
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
