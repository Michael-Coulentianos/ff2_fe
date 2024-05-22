import * as React from "react";
import Box from "@mui/material/Box";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import FFElogo from "../../assets/logos/fflogoYellow.png";
import FFMlogo from "../../assets/logos/fflogoOrange.png";
import menuIcon from "../../assets/icons/menuIcon.svg";

export default function ApplicationsMenu() {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  return (
    <>
      <Box>
        <Tooltip title="Applications">
          <IconButton
            onClick={handleClick}
            size="small"
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            edge="start"
            color="inherit"
            aria-label="open apps"
            sx={{ mt: 1, mb: 1.5, mr: 1 }}
          >
            <img src={menuIcon} alt="menuIcon" />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            ml: 5,
            "& .MuiAvatar-root": {
              width: 20,
              height: 20,
              ml: -0.5,
              mr: 1,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem onClick={handleClose}>
          <img
            src={FFElogo}
            alt="FFElogo"
            height={"25px"}
            width={"25px"}
            style={{ marginRight: "5px" }}
          />
          Farmers Friend Enterprise
        </MenuItem>
        <Divider />
        <MenuItem onClick={handleClose}>
          <img
            src={FFMlogo}
            alt="FFMlogo"
            height={"25px"}
            width={"25px"}
            style={{ marginRight: "5px" }}
          />
          Farmers Friend Mobile
        </MenuItem>
      </Menu>
    </>
  );
}
