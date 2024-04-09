import React from "react";
import {
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";

interface MenuItemProps {
  text: string;
  icon: React.ReactNode;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon }) => (
  <ListItem disablePadding>
    <ListItemButton>
      <ListItemIcon>{icon}</ListItemIcon>
      <ListItemText primary={text} sx={{ color: "white" }} />
    </ListItemButton>
  </ListItem>
);

export default MenuItem;
