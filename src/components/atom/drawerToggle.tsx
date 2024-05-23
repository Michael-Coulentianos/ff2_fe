// Atoms
import React from "react";
import { IconButton, Tooltip } from "@mui/material";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import theme from "../../theme";

interface DrawerToggleButtonProps {
  open: boolean;
  onClick: () => void;
}

const DrawerToggleButton: React.FC<DrawerToggleButtonProps> = ({
  open,
  onClick,
}) => (
  <Tooltip title={open ? "Close Menu" : "Open Menu"}>
    <IconButton
      size="small"
      edge="start"
      color="inherit"
      aria-label="open drawer"
      onClick={onClick}
      sx={{
        height: "20px",
        width: "20px",
        fontSize: "5px",
        top: open ? "140px" : "90px",
        marginLeft: open ? "228px" : "0px",
        position: "absolute",
        backgroundColor: theme.palette.secondary.main,
        "&:hover": {
          backgroundColor: "#F1A81E",
          color: "#00000",
        },
      }}
    >
      {open ? (
        <ChevronLeftIcon sx={{ color: "white" }} />
      ) : (
        <ChevronRightIcon sx={{ color: "white" }} />
      )}
    </IconButton>
  </Tooltip>
);

export default DrawerToggleButton;
