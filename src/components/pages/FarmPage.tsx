import { Divider, Grid } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import KanbanBoard from "../organisms/kanbanBoard/kanbanOverview";
import FarmFieldManagement from "../organisms/farmManageCard";

const FarmManagement = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 className="title">Farm Management</h1>
        <Divider />
      </Grid>
      <Grid item xs={12}>
        <FieldMapComponent height={"400px"}></FieldMapComponent>
        <FarmFieldManagement></FarmFieldManagement>
      </Grid>
      <Grid item xs={12}>
        <KanbanBoard></KanbanBoard>
      </Grid>
    </Grid>
  );
};

export default FarmManagement;
