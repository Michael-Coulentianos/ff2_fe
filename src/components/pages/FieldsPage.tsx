import { Divider, Grid, Paper, Typography } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import FieldForm from "../organisms/FieldDetails";
import { useLocation } from "react-router-dom";

const FieldManagement = () => {
  const location = useLocation();
  const fieldData = location.state?.fieldData;
  return (
    <Grid container>
      <Grid item xs={12}>
        <Typography variant="h5">Field Management</Typography>
        <Divider sx={{ marginTop: 1 }} />
      </Grid>
      <Grid item xs={9}>
        <FieldMapComponent
          height={"500px"}
          fieldData={fieldData}
        ></FieldMapComponent>
      </Grid>
      <Grid item xs={3}>
        <FieldForm fieldData={fieldData}></FieldForm>
      </Grid>
    </Grid>
  );
};

export default FieldManagement;
