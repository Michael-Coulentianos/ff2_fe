import { Grid } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import WeatherGraph from "../molecules/WeatherGraph";
import Paper from "@mui/material/Paper";

const HomeDashboard = () => {
  return (
    <Grid container>
      <Grid item xs={4}>
        <Paper elevation={3} sx={{ height: "235px", marginTop: 1 }} />
      </Grid>
      <Grid item xs={8}>
        <FieldMapComponent height={"230px"}></FieldMapComponent>
      </Grid>
      <Grid item xs={12}>
        <WeatherGraph></WeatherGraph>
      </Grid>
    </Grid>
  );
};

export default HomeDashboard;
