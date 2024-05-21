import React, { useEffect } from "react";
import SearchBar from "../molecules/searchBar";
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  Link,
  Toolbar,
  useTheme,
  useMediaQuery,
  Typography,
  Tooltip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import MuiAppBar from "@mui/material/AppBar";
import FFlogo from "../../assets/logos/fflogoGreen.png";
import ApplicationsMenu from "../molecules/appMenu";
import { loginRequest } from "../../auth-config";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { UserProfileForm } from "./profileSettings";
import { useGlobalState } from "../../GlobalState";
import QuickAdd from "../atom/quickAdd";
import { useState } from "react";

export default function Header() {
  const theme = useTheme();
  const { instance } = useMsal();
  const { selectedOrganization } = useGlobalState();

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const [openDialog, setOpenDialog] = useState(false);

  const handleLogoutRedirect = () => {
    setOpenDialog(true);
  };
  const handleLogoutConfirm = () => {
    instance.logoutRedirect();
    setOpenDialog(false);
  };

  const handleLogoutCancel = () => {
    setOpenDialog(false);
  };
  const isSmScreen = useMediaQuery(theme.breakpoints.up("sm"));
  return (
    <Box>
      <CssBaseline />
      <MuiAppBar
        sx={{
          backgroundColor: theme.palette.common.white,
          height: "50px",
        }}
        position="fixed"
      >
        <Toolbar>
          <ApplicationsMenu />
          <Link href={"/"} underline="none" sx={{ mr: 1 }}>
            <img src={FFlogo} alt="FFlogo" height={"30px"} width={"30px"} />
          </Link>
          {isSmScreen && (
            <Link
              href={"/"}
              flexGrow={1}
              color={theme.palette.primary.main}
              variant="h6"
              marginLeft={2}
              underline="none"
            >
              Farmers Friend
            </Link>
          )}
          {selectedOrganization && (
            <>
              <QuickAdd />
              <SearchBar />
            </>
          )}
          <AuthenticatedTemplate>
            <UserProfileForm />
            <Tooltip title="Log Out">
              <IconButton
                aria-label="exit"
                sx={{
                  color: theme.palette.primary.main,
                  width: "30px",
                  height: "30px",
                }}
                onClick={handleLogoutRedirect}
              >
                <ExitToAppIcon fontSize="small" />
              </IconButton>
            </Tooltip>
            <Dialog
              open={openDialog}
              onClose={handleLogoutCancel}
              aria-labelledby="alert-dialog-title"
              aria-describedby="alert-dialog-description"
            >
              <DialogTitle id="alert-dialog-title">
                {"Confirm Logout"}
              </DialogTitle>
              <DialogContent>
                <DialogContentText id="alert-dialog-description">
                  Are you sure you want to log out?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button onClick={handleLogoutCancel} color="primary">
                  Cancel
                </Button>
                <Button
                  variant="contained"
                  onClick={handleLogoutConfirm}
                  color="primary"
                  autoFocus
                >
                  Logout
                </Button>
              </DialogActions>
            </Dialog>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Button
              variant="outlined"
              onClick={handleLoginRedirect}
              sx={{ maxHeight: "25px" }}
            >
              <Typography noWrap>Sign in</Typography>
            </Button>
          </UnauthenticatedTemplate>
        </Toolbar>
      </MuiAppBar>
    </Box>
  );
}
