import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Link as RouterLink } from "react-router-dom";

interface MenuItemProps {
  text: string;
  icon: React.ReactNode;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon,  onClick }) => (
  <ListItem disablePadding>
    <ListItemButton
      onClick={onClick}
      sx={{
        "&:hover": {
          backgroundColor: "#F1A81E",
        },
      }}
    >
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} sx={{ color: "white" }} />
    </ListItemButton>
  </ListItem>
);

export default MenuItem;
