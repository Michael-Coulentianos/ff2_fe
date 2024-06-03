import { Paper } from "@mui/material";
import React, { useEffect } from "react";
import Iframe from "react-iframe";
import { useGlobalState } from "../../GlobalState";

interface FieldMapProps {
  height?: string;
  fieldData?: any;
  onLoad: () => void; // Callback to be called when the map is loaded
}

const FieldMapComponent: React.FC<FieldMapProps> = ({ height, fieldData, onLoad }) => {
  const { selectedOrganization } = useGlobalState();
console.log("selectedOrganization");
console.log(selectedOrganization);
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
        height={"650px" || height}
        display="initial"
        position="relative"
        frameBorder={0}
        onLoad={onLoad}
      />
    </div>
  );
};

export default FieldMapComponent;
