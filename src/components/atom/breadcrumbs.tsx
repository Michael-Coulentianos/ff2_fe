import React from "react";
import { Box, Breadcrumbs, Typography, Link } from "@mui/material";

interface BreadcrumbProps {
  crumbs: {
    text: string;
    onClick: any;
    underline?: "none" | "hover" | "always" | undefined;
  }[];
  currentCrumb: string;
}

export const Breadcrumb: React.FC<BreadcrumbProps> = ({
  crumbs,
  currentCrumb,
}) => {
  return (
    <Breadcrumbs
      aria-label="breadcrumb"
      sx={{ p: 0.5, backgroundColor: "primary.main", color: "white" }}
    >
      {crumbs?.map((crumbs) => (
        <Box sx={{ml:"10px"}} role="presentation" onClick={crumbs.onClick}>
          <Link underline={crumbs.underline} color="inherit">
            {crumbs.text}
          </Link>
        </Box>
      ))}
      <Typography color="text.common">{currentCrumb}</Typography>
    </Breadcrumbs>
  );
};
