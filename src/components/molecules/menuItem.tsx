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
  href: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, icon, href }) => (
  <ListItem disablePadding>
    <ListItemButton
      href={href}
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
