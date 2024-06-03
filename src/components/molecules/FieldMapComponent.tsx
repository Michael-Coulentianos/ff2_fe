import { Paper } from "@mui/material";
import React from "react";
import Iframe from "react-iframe";
import { useGlobalState } from "../../GlobalState";

interface FieldMapProps {
  height?: string;
  fieldData?: any;
}

const FieldMapComponent: React.FC<FieldMapProps> = ({ height, fieldData }) => {
  const { selectedOrganization, activeAccount } = useGlobalState();
  const azureUserId = activeAccount?.localAccountId;

  const cropperRef = fieldData?.cropperRef;
  let mapUrl = "";
  if (cropperRef !== undefined) {
    mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${selectedOrganization?.partyIdentifier}/${cropperRef}`;
  } else {
    mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${selectedOrganization?.partyIdentifier}`;
  }
  return (
    <div>
      <Iframe
        url={mapUrl}
        width="100%"
        height={"500px" || height}
        display="initial"
        position="relative"
        frameBorder={0}
      />
    </div>
  );
};

export default FieldMapComponent;
