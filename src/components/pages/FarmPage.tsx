import { Divider, Grid, Typography } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import KanbanBoard from "../organisms/kanbanBoard/kanbanOverview";
import FarmFieldManagement from "../organisms/farmManageCard";
import { useState } from "react";

const FarmManagement = () => {

  const [mapLoaded, setMapLoaded] = useState(false); // State to track if the map is loaded

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  return (
    <Grid container>
      <Grid item xs={12}>
        <FieldMapComponent onLoad={handleMapLoad}></FieldMapComponent>
        <FarmFieldManagement></FarmFieldManagement>
      </Grid>
      <Grid item xs={12}>
        <KanbanBoard></KanbanBoard>
      </Grid>
    </Grid>
  );
};

export default FarmManagement;
