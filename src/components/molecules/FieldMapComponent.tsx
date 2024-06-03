import { Paper } from "@mui/material";
import React, { useEffect, useState } from "react";
import Iframe from "react-iframe";
import { useGlobalState } from "../../GlobalState";
import { fetchData } from "../../hooks/useFethData";
import { getOrganizations } from "../../api-ffm-service";

interface FieldMapProps {
  height?: string;
  fieldData?: any;
  onLoad: () => void; // Callback to be called when the map is loaded
}

const FieldMapComponent: React.FC<FieldMapProps> = ({ height = '650px', fieldData, onLoad }) => {
  const { selectedOrganization } = useGlobalState();
  const [organizations, setOrganizations] = useState<any[]>([]);
  const cropperRef = fieldData?.cropperRef;

  useEffect(() => {
    fetchData(getOrganizations, setOrganizations);
  }, []);

  let mapUrl = '';

  if (cropperRef) {
    mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${selectedOrganization?.partyIdentifier}/${cropperRef}`;
  } else if (selectedOrganization) {
    mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${selectedOrganization.partyIdentifier}`;
  } else if (organizations.length > 0) {
    mapUrl = `${process.env.REACT_APP_MAPPING_TOOL}/field/${organizations[0].partyIdentifier}`;
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
        onLoad={onLoad}
      />
    </div>
  );
};

export default FieldMapComponent;
