import { Divider, Grid, Paper } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import FieldForm from "../organisms/FieldDetails";

const FieldManagement = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 className="title">Field Management</h1>
        <Divider />
      </Grid>
      <Grid item xs={9}>
        <FieldMapComponent height={"485px"}></FieldMapComponent>
      </Grid>
      <Grid item xs={3}>
          <FieldForm></FieldForm>
      </Grid>
     
    </Grid>
  );
};

export default FieldManagement;
