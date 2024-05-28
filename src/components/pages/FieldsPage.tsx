import { useState, useEffect } from "react";
import { Divider, Grid, Typography } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import FieldForm from "../organisms/FieldDetails";
import { useLocation } from "react-router-dom";

const FieldManagement = () => {
  const location = useLocation();
  const initialFieldData = location.state?.fieldData;

  const [fieldData, setFieldData] = useState(initialFieldData);

  const handleFieldDataChange = (updatedFieldData) => {
    setFieldData(updatedFieldData);
  };

  useEffect(() => {
    // Ensure fieldData is updated when location state changes
    if (location.state?.fieldData !== fieldData) {
      setFieldData(location.state?.fieldData);
    }
  }, [location.state?.fieldData]);

  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Field Management</Typography>
        <Divider sx={{ marginTop: 1 }} />
      </Grid>
      <Grid item xs={9}>
        <FieldMapComponent height="500px" fieldData={fieldData} />
      </Grid>
      <Grid item xs={3}>
        <FieldForm
          initialFieldData={fieldData}
          onFieldDataChange={handleFieldDataChange}
        />
      </Grid>
    </Grid>
  );
};

export default FieldManagement;
