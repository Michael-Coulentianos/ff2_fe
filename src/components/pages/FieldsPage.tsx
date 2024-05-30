import { useState, useEffect } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import FieldForm from "../organisms/FieldDetails";
import { useLocation } from "react-router-dom";

const FieldManagement = () => {
  const location = useLocation();
  const initialFieldData = location.state?.fieldData;

  const [fieldData, setFieldData] = useState(initialFieldData);
  const [mapLoaded, setMapLoaded] = useState(false); // State to track if the map is loaded
const [polygonData, setPolygonData] = useState();
  const handleFieldDataChange = (updatedFieldData) => {
    setFieldData(updatedFieldData);
  };

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const handleMessage = (event) => {
    console.log("event");
    console.log("Event origin:", event.origin);
    console.log("Expected origin:", process.env.REACT_APP_MAPPING_TOOL);
    if (event.origin !== process.env.REACT_APP_MAPPING_TOOL) {
      console.warn("Ignoring message from unexpected origin:", event.origin);
      return;
    }
    const { data } = event;
    console.log(data);
    if (data.type === 'updatedPolygon') {
      setPolygonData(data);
      //setPolygonArea(data.area);
    }
  };

  useEffect(() => {
    if (location.state?.fieldData !== fieldData) {
      setFieldData(location.state?.fieldData);
    }

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [location.state?.fieldData, fieldData]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Field Management</Typography>
        <Divider sx={{ marginTop: 1 }} />
      </Grid>
      <Grid item xs={9}>
        <FieldMapComponent height="500px" fieldData={fieldData} onLoad={handleMapLoad} />
      </Grid>
      <Grid item xs={3}>
        {mapLoaded && (
          <FieldForm
            initialFieldData={fieldData}
            onFieldDataChange={handleFieldDataChange}
            polygonData={polygonData}
          />
        )}
      </Grid>
    </Grid>
  );
};

export default FieldManagement;
