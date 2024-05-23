import { Paper } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";
import { useGlobalState } from '../../GlobalState';

interface FieldMapProps {
  height: string;
  fieldData?: any;
}

const FieldMapComponent: React.FC<FieldMapProps> = ({ height, fieldData }) => {
  const { activeAccount } = useGlobalState();
  const azureUserId = activeAccount?.localAccountId;
  console.log("fieldData");
  console.log(fieldData);
  const cropperRef = fieldData?.cropperRef;
  let mapUrl = ""
  if (cropperRef !== undefined){
  mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${azureUserId}/${cropperRef}`;
} else 
{
  mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${azureUserId}`;

}
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
