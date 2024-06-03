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
  open: boolean;
  icon: React.ReactNode;
  onClick?: () => void;
}

const MenuItem: React.FC<MenuItemProps> = ({ text, open, icon, onClick }) => (
  <ListItem disablePadding>
    <ListItemButton
      onClick={onClick}
      sx={{
        "&:hover": {
          backgroundColor: "#F1A81E",
        },
        "&:focus": {
          backgroundColor: "#F1A81E",
        },
        "&:visited": {
          backgroundColor: "#F1A81E",
        },
      }}
    > 
      <ListItemText
        primary={text}
        sx={{ opacity: open ? 1 : 0, ml: 6, color: "white" }}
      />
    </ListItemButton>
  </ListItem>
);

export default MenuItem;
