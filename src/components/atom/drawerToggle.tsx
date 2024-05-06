// Atoms
import React from "react";
import { IconButton } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

interface DrawerToggleButtonProps {
  open: boolean;
  onClick: () => void;
}

const DrawerToggleButton: React.FC<DrawerToggleButtonProps> = ({
  open,
  onClick,
}) => (
  <IconButton
    size="small"
    edge="start"
    color="inherit"
    aria-label="open drawer"
    onClick={onClick}
    sx={{ mr: 1, ...(open && { display: "none" }) }}
  >
    {open ? (
      <ChevronLeftIcon sx={{ color: "#3C4F1E"}} />
    ) : (
      <ChevronRightIcon sx={{ color: "#3C4F1E"}} />
    )}
  </IconButton>
);

export default DrawerToggleButton;
