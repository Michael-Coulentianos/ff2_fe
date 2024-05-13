import { Divider, Grid, Paper } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import KanbanBoard from "../organisms/kanbanBoard/kanbanOverview";

const FieldManagement = () => {
  return (
    <Grid container>
      <Grid item xs={12}>
        <h1 className="title">Field Management</h1>
        <Divider />
      </Grid>
      <Grid item xs={10}>
        <FieldMapComponent height={"400px"}></FieldMapComponent>
      </Grid>
      <Grid item xs={2}>
        <Paper elevation={3} sx={{ height: "405px", marginTop: 1 }} />
      </Grid>
      <Grid item xs={12}>
        <Paper elevation={3} sx={{ height: "420px", marginTop: 1 }}>
          <KanbanBoard></KanbanBoard>
        </Paper>
      </Grid>
    </Grid>
  );
};

export default FieldManagement;
