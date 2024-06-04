import { Divider, Grid, Typography } from "@mui/material";
import FieldMapComponent from "../molecules/FieldMapComponent";
import KanbanBoard from "../organisms/kanbanBoard/kanbanOverview";
import FarmFieldManagement from "../organisms/farmManageCard";
import { useState } from "react";
import { Breadcrumb } from "../atom/breadcrumbs";
import { useNavigate } from "react-router-dom";

const FarmManagement = () => {
  const [mapLoaded, setMapLoaded] = useState(false); // State to track if the map is loaded

  const handleMapLoad = () => {
    setMapLoaded(true);
  };

  const navigate = useNavigate();
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    navigate(-1);
  }

  return (
    <Grid container>
      <Grid item xs={12}>
        <Breadcrumb
          crumbs={[
            { text: "<< Back", onClick: handleClick, underline: "hover" },
            { text: "My Farm", onClick: undefined, underline: "none" },
          ]}
          currentCrumb={"Farm Management"}
        ></Breadcrumb>
        <FieldMapComponent
          height="500px"
          onLoad={handleMapLoad}
        ></FieldMapComponent>
        <FarmFieldManagement></FarmFieldManagement>
      </Grid>
      <Grid item xs={12}>
        <KanbanBoard></KanbanBoard>
      </Grid>
    </Grid>
  );
};

export default FarmManagement;
