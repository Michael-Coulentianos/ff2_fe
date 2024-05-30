import React, { useState } from "react";
import { Grid, Divider, Typography } from "@mui/material";
import KanbanBoard from "../organisms/kanbanBoard/kanbanOverview";

const Activities: React.FC = () => {

  return (
    <Grid container spacing={2}>
      <Grid item xs={12}>
        <Typography variant="h5">Activity Management</Typography>
        <Divider sx={{ marginTop: 1 }} />
      </Grid>
      <Grid item xs={12}>
        <KanbanBoard></KanbanBoard>
      </Grid>
    </Grid>
  );
};

export default Activities;
