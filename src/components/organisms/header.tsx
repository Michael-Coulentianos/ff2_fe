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
import { setAzureUserId } from "../../api-ffm-service";
import { useGlobalState } from "../../GlobalState";
import QuickAdd from "../atom/quickAdd";

export default function Header() {
  const theme = useTheme();
  const { setActiveAccount } = useGlobalState();
  const { instance } = useMsal();

  useEffect(() => {
    if (instance) {
      const activeAccount = instance.getActiveAccount();
      if (activeAccount) {
        setAzureUserId(activeAccount.localAccountId);
        setActiveAccount(activeAccount);
      }
    }
  }, [instance, setActiveAccount]);

  const handleLoginRedirect = () => {
    instance.loginRedirect(loginRequest).catch((error) => console.log(error));
  };

  const handleLogoutRedirect = () => {
    instance.logoutRedirect();
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
          <QuickAdd />
          <SearchBar />
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
