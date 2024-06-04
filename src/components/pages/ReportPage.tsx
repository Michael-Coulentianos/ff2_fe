import React from "react";
import ActivitySummary from "../organisms/activitySummary";
import { Breadcrumb } from "../atom/breadcrumbs";
import { useNavigate } from "react-router-dom";
import { Grid } from "@mui/material";

const ReportPage = () => {
  const navigate = useNavigate();
  function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
    event.preventDefault();
    navigate(-1);
  }
  return (
    <>
      <Breadcrumb
        crumbs={[
          { text: "<< Back", onClick: handleClick, underline: "hover" },
          { text: "Administration", onClick: undefined, underline: "none" },
        ]}
        currentCrumb={"Reports"}
      ></Breadcrumb>
      <Grid container margin={2}>
        <ActivitySummary></ActivitySummary>
      </Grid>
    </>
  );
};

export default ReportPage;
