import React, { useState } from "react";
import {
  Avatar,
  Grid,
  Menu,
  MenuItem,
  Paper,
  Typography,
  useTheme,
} from "@mui/material";
import UnfoldMoreIcon from "@mui/icons-material/UnfoldMore";
import barnIcon from "../../assets/icons/barnIcon.svg";
import { getOrganizations } from "../../api-ffm-service";
import { useFetchData } from '../../hooks/useFethData';
import { useGlobalState } from '../../GlobalState';
import { Organization } from '../../models/organization.interface';
import { useLocation, useNavigate } from "react-router-dom";

const UserOrganizationComponent: React.FC = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [organizations, setOrganizations] = useState<Organization[]>([]);
  const theme = useTheme();
  
  const { selectedOrganization, setSelectedOrganization } = useGlobalState();

  useFetchData(getOrganizations, setOrganizations);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleOrgClick = (org: Organization) => {
    setSelectedOrganization(org);
    //navigate("/");
    handleClose();
  };

  return (
    <>
      <Paper
        elevation={3}
        sx={{
          padding: "10px",
          minWidth: "220px",
          backgroundColor: theme.palette.background.paper,
          "&:hover": {
            backgroundColor: "#C5CBBC",
          },
        }}
        onClick={handleClick}
      >
        <Grid container>
          <Grid item xs={2} sx={{ marginTop: 1 }}>
            <img src={barnIcon} alt="barnIcon" />
          </Grid>
          <Grid item xs={9} sx={{ paddingLeft: 2 }}>
            <Typography variant="body1">
              {selectedOrganization ? selectedOrganization.name : "Name"}
            </Typography>
            <Typography variant="caption">Organization</Typography>
          </Grid>
          <Grid item xs={1} sx={{ marginTop: 2 }}>
            <UnfoldMoreIcon fontSize="small" />
          </Grid>
        </Grid>
      </Paper>
      <Menu
        anchorEl={anchorEl}
        open={Boolean(anchorEl)}
        onClose={handleClose}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        PaperProps={{
          sx: {
            minWidth: "210px",
          },
        }}
      >
        {organizations.map((org) => (
          <MenuItem
            key={org.id}
            sx={{
              color: theme.palette.primary.main,
              "&:hover": {
                backgroundColor: "#C5CBBC",
                color: theme.palette.primary.main,
              },
            }}
            onClick={() => handleOrgClick(org)}
          >
            <Avatar
              alt="Org"
              sx={{
                marginRight: "10px",
                height: "30px",
                width: "30px",
                fontSize: "15px",
                backgroundColor: theme.palette.primary.main,
              }}
              src="/path/to/avatar-image.jpg"
            >
              {org.name.charAt(0)}
            </Avatar>
            {org.name}
          </MenuItem>
        ))}
      </Menu>
    </>
  );
};

export default UserOrganizationComponent;
