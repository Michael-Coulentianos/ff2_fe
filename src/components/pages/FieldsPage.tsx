import { Divider, Grid, Paper } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";

const FieldManagement = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 className="title">Field Management</h1>
        <Divider />
      </Grid>
      <Grid item xs={10}>
        <FieldMapComponent height={"500px"}></FieldMapComponent>
      </Grid>
      <Grid item xs={2}>
        <Paper elevation={3} sx={{ height: "505px", marginTop: 1 }} />
      </Grid>
    </Grid>
  );
};

export default FieldManagement;
