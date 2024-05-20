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
  href: string;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon, href, onClick }) => (
  <ListItem disablePadding>
    <ListItemButton
      component={RouterLink}
      to={href}
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
