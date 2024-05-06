import React from "react";
import {
  Collapse,
  Divider,
  Drawer,
  IconButton,
  List,
  ListItem,
  Typography,
  styled,
} from "@mui/material";
import { useMsal } from "@azure/msal-react";
import ChevronLeftIcon from "@mui/icons-material/ChevronLeft";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import { DataUsage, Grass } from "@mui/icons-material";
import barnIcon from "../../assets/icons/barnIcon.svg";
import MenuItem from "../molecules/menuItem";
import DrawerToggleButton from "../atom/drawerToggle";
import theme from "../../theme";

const drawerWidth = 240;

const DrawerHeader = styled("div")(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  padding: theme.spacing(1, 1),
  ...theme.mixins.toolbar,
  justifyContent: "space-around",
  backgroundColor: "#3C4F1E",
}));

const CollapsibleSection = ({ open, children }) => {
  return (
    <Collapse in={open} timeout="auto" unmountOnExit>
      <List component="div" disablePadding>
        {children}
      </List>
    </Collapse>
  );
};

const StyledListItem = styled(ListItem)(({ theme }) => ({
  "&:hover": {
    backgroundColor: "#F1A81E",
    color: "#00000",
  },
}));

const NavigationDrawer = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  const [openCollapseMyFarm, setOpenCollapseMyFarm] = React.useState(false);
  const [openCollapseOperations, setOpenCollapseOperations] =
    React.useState(false);
  const [openCollapseCropAndClimate, setOpenCollapseCropAndClimate] =
    React.useState(false);
  const [openCollapseAdministration, setOpenCollapseAdministration] =
    React.useState(false);

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

  const { instance } = useMsal();
  let activeAccount;

  if (instance) {
    activeAccount = instance.getActiveAccount();
  }

  return (
    <>
      <DrawerToggleButton open={open} onClick={handleDrawerOpen}  />
      <Drawer
        sx={{
          flexShrink: 0,
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            boxSizing: "border-box",
            backgroundColor: "#3C4F1E",
            marginTop: "50px",
          },
        }}
        variant="persistent"
        anchor="left"
        open={open}
      >
        <DrawerHeader>
          <img src={barnIcon} alt="barnIcon" />
          <Typography sx={{ marginTop: 0.5, color: "white" }}>
            {activeAccount ? activeAccount?.name : "Farmer"}’s Farm
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
              <StyledListItem
                disablePadding
                onClick={() => handleOpenHeading(text)}
              >
                <MenuItem text={text} icon={icon} href={""} />
                {open ? (
                  <ArrowDropUpIcon sx={{ color: "white" }} />
                ) : (
                  <ArrowDropDownIcon sx={{ color: "white" }} />
                )}
              </StyledListItem>
              {text === "My Farm" && (
                <CollapsibleSection open={open}>
                  <MenuItem text="Farm Management" icon={undefined} href={""} />
                  <MenuItem
                    text="Fields Management"
                    icon={undefined}
                    href={""}
                  />
                  <MenuItem
                    text="Activity Management"
                    icon={undefined}
                    href={""}
                  />
                </CollapsibleSection>
              )}
              {text === "Operations" && (
                <CollapsibleSection open={open}>
                  <MenuItem text="Warehouse" icon={undefined} href={""} />
                  <MenuItem
                    text="Financial Management"
                    icon={undefined}
                    href={""}
                  />
                  <MenuItem
                    text="Alert Management"
                    icon={undefined}
                    href={""}
                  />
                </CollapsibleSection>
              )}
              {text === "Crop and Climate" && (
                <CollapsibleSection open={open}>
                  <MenuItem text="Climate Data" icon={undefined} href={""} />
                  <MenuItem text="Crop Data" icon={undefined} href={""} />
                  <MenuItem text="Sensor Data" icon={undefined} href={""} />
                </CollapsibleSection>
              )}
              {text === "Administration" && (
                <CollapsibleSection open={open}>
                  <MenuItem text="Reports" icon={undefined} href={""} />
                  <MenuItem text="Documentation" icon={undefined} href={""} />
                  <MenuItem
                    text="Settings"
                    icon={undefined}
                    href={"/settings"}
                  />
                  <MenuItem text="Notes" icon={undefined} href={"/notes"} />
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
