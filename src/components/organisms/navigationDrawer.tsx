import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import { DataUsage, Grass } from "@mui/icons-material";
import barnIcon from "../../assets/icons/barnIcon.svg";
import menuIcon from "../../assets/icons/menuIcon.svg";
import { useState } from "react";
import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";
import theme from "../../theme";
const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: theme.spacing(1, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
  justifyContent: "space-around",
  backgroundColor: "#3C4F1E",
}));

const MenuItem = ({ text, icon }) => {
  return (
    <ListItem disablePadding>
      <ListItemButton>
        <ListItemIcon>{icon}</ListItemIcon>
        <ListItemText primary={text} sx={{ color: "white" }} />
      </ListItemButton>
    </ListItem>
  );
};

const CollapsibleSection = ({ open, text, children }) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {children}
      </List>
    </Collapse>
  );
};
const NavigationDrawer = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  const [openCollapseMyFarm, setOpenCollapseMyFarm] = useState(false);
  const [openCollapseOperations, setOpenCollapseOperations] = useState(false);
  const [openCollapseCropAndClimate, setOpenCollapseCropAndClimate] =
    useState(false);
  const [openCollapseAdministration, setOpenCollapseAdministration] =
    useState(false);

  const handleOpenHeading = (section) => {
    switch (section) {
      case "My Farm":
        setOpenCollapseMyFarm(!openCollapseMyFarm);
        break;
      case "Operations":
        setOpenCollapseOperations(!openCollapseOperations);
        break;
      case "Crop and Climate":
        setOpenCollapseCropAndClimate(!openCollapseCropAndClimate);
        break;
      case "Administration":
        setOpenCollapseAdministration(!openCollapseAdministration);
        break;
      default:
        break;
    }
  };
  return (
    <>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        onClick={handleDrawerOpen}
        sx={{ mr: 2, ...(open && { display: "none" }) }}
      >
        <img src={menuIcon} alt="menuIcon" />
      </IconButton>

      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#3C4F1E",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src={barnIcon} alt="barnIcon" />
          <Typography sx={{ marginTop: 0.5, color: "white" }}>
            Sean’s Farm
          </Typography>
          <IconButton onClick={handleDrawerClose}>
            {theme.direction === "ltr" ? (
              <ChevronLeftIcon sx={{ color: "white" }} />
            ) : (
              <ChevronRightIcon sx={{ color: "white" }} />
            )}
          </IconButton>
        </DrawerHeader>
        <Divider />
        <List>
          {[
            {
              text: "My Farm",
              icon: <Grass sx={{ color: "white" }} />,
              open: openCollapseMyFarm,
            },
            {
              text: "Operations",
              icon: <SettingsIcon sx={{ color: "white" }} />,
              open: openCollapseOperations,
            },
            {
              text: "Crop and Climate",
              icon: <DataUsage sx={{ color: "white" }} />,
              open: openCollapseCropAndClimate,
            },
            {
              text: "Administration",
              icon: <AdminPanelSettingsIcon sx={{ color: "white" }} />,
              open: openCollapseAdministration,
            },
          ].map(({ text, icon, open }, index) => (
            <div key={text}>
              <ListItem disablePadding onClick={() => handleOpenHeading(text)}>
                <MenuItem text={text} icon={icon} />
                {open ? (
                  <ArrowDropUpIcon sx={{ color: "white" }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: "white" }} />
                )}
              </ListItem>
              {text === "My Farm" && (
                <CollapsibleSection open={open} text={undefined}>
                  <MenuItem text="Farm Management" icon={undefined} />
                  <MenuItem text="Fields Management" icon={undefined} />
                  <MenuItem text="Activity Management" icon={undefined} />
                </CollapsibleSection>
              )}
              {text === "Operations" && (
                <CollapsibleSection open={open} text={undefined}>
                  <MenuItem text="Warehouse" icon={undefined} />
                  <MenuItem text="Financial Management" icon={undefined} />
                  <MenuItem text="Alert Management" icon={undefined} />
                </CollapsibleSection>
              )}
              {text === "Crop and Climate" && (
                <CollapsibleSection open={open} text={undefined}>
                  <MenuItem text="Climate Data" icon={undefined} />
                  <MenuItem text="Crop Data" icon={undefined} />
                  <MenuItem text="Sensor Data" icon={undefined} />
                </CollapsibleSection>
              )}
              {text === "Administration" && (
                <CollapsibleSection open={open} text={undefined}>
                  <MenuItem text="Report Generating" icon={undefined} />
                  <MenuItem text="Documentation" icon={undefined} />
                  <MenuItem text="Settings" icon={undefined} />
                  <MenuItem text="Notes" icon={undefined} />
                </CollapsibleSection>
              )}
            </div>
          ))}
        </List>
      </Drawer>
    </>
  );
};

export default NavigationDrawer;
