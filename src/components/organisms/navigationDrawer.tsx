import React from "react";
import { Collapse, Drawer, Grid, List, ListItem, styled } from "@mui/material";
import { useMsal } from "@azure/msal-react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArrowDropUpIcon from "@mui/icons-material/ArrowDropUp";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import SettingsIcon from "@mui/icons-material/Settings";
import { DataUsage, Grass } from "@mui/icons-material";
import MenuItem from "../molecules/menuItem";
import DrawerToggleButton from "../atom/drawerToggle";
import UserOrganizationComponent from "../molecules/UserOrgSelect";
import { useNavigate } from "react-router-dom";
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
  cursor: "pointer",
}));

const NavigationDrawer = ({ open, handleDrawerOpen, handleDrawerClose }) => {
  const [openCollapseMyFarm, setOpenCollapseMyFarm] = React.useState(false);
  const [openCollapseOperations, setOpenCollapseOperations] =
    React.useState(false);
  const [openCollapseCropAndClimate, setOpenCollapseCropAndClimate] =
    React.useState(false);
  const [openCollapseAdministration, setOpenCollapseAdministration] =
    React.useState(false);
  const navigate = useNavigate();
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
    <Grid container>
      <Grid item>
        <Drawer
          sx={{
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: drawerWidth,
              boxSizing: "border-box",
              backgroundColor: "#3C4F1E",
              marginTop: "50px",
              paddingBottom: "35px",
            },
          }}
          variant="persistent"
          anchor="left"
          open={open}
        >
          <DrawerHeader>
            <UserOrganizationComponent></UserOrganizationComponent>
          </DrawerHeader>
          <List
            sx={{
              marginTop: "15px",
              zIndex: -1,
            }}
          >
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
                  <MenuItem text={text} icon={icon} onClick={undefined} />
                  {open ? (
                    <ArrowDropUpIcon sx={{ color: "white" }} />
                  ) : (
                    <ArrowDropDownIcon sx={{ color: "white" }} />
                  )}
                </StyledListItem>
                {text === "My Farm" && (
                  <CollapsibleSection open={open}>
                    <MenuItem
                      text="Farm Management"
                      icon={undefined}
                      onClick={()=>navigate("/")}
                    />
                    <MenuItem
                      text="Activity Management"
                      icon={undefined}
                      onClick={()=>navigate("/activity")}
                    />
                  </CollapsibleSection>
                )}
                {text === "Operations" && (
                  <CollapsibleSection open={open}>
                    <MenuItem
                      text="Warehouse"
                      icon={undefined}
                      onClick={undefined}
                    />
                    <MenuItem
                      text="Financial Management"
                      icon={undefined}
                      onClick={undefined}
                    />
                    <MenuItem
                      text="Alert Management"
                      icon={undefined}
                      onClick={undefined}
                    />
                  </CollapsibleSection>
                )}
                {text === "Crop and Climate" && (
                  <CollapsibleSection open={open}>
                    <MenuItem
                      text="Climate Data"
                      icon={undefined}
                      onClick={undefined}
                    />
                    <MenuItem
                      text="Crop Data"
                      icon={undefined}
                      onClick={undefined}
                    />
                    <MenuItem
                      text="Sensor Data"
                      icon={undefined}
                      onClick={undefined}
                    />
                  </CollapsibleSection>
                )}
                {text === "Administration" && (
                  <CollapsibleSection open={open}>
                    <MenuItem
                      text="Reports"
                      icon={undefined}
                      onClick={undefined}
                    />
                    <MenuItem
                      text="Documentation"
                      icon={undefined}
                      onClick={undefined}
                    />
                    <MenuItem
                      text="Settings"
                      icon={undefined}
                      onClick={()=>navigate("/settings")}
                    />
                    <MenuItem
                      text="Notes"
                      icon={undefined}
                      onClick={()=>navigate("/notes")}
                    />
                  </CollapsibleSection>
                )}
              </div>
            ))}
          </List>
        </Drawer>
      </Grid>
      <Grid item style={{ zIndex: 1300, position: "fixed" }}>
        <DrawerToggleButton
          open={open}
          onClick={open ? handleDrawerClose : handleDrawerOpen}
        />
      </Grid>
    </Grid>
  );
};

export default NavigationDrawer;
