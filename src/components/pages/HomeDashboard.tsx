import { Grid, Typography } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";

const HomeDashboard = () => {
  return (
    <Grid container>
      <Grid item xs={10}>
        <FieldMapComponent></FieldMapComponent>
      </Grid>
      <Grid item xs={2}>
       <></>
      </Grid>
    </Grid>
  );
};

export default HomeDashboard;
