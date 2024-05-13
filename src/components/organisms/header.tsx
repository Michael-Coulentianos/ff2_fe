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
import NavigationDrawer from "./navigationDrawer";
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
import { setAzureUserId } from "../../apiService";
import QuickAdd from "../atom/quickAdd";

export default function Header({ open, handleDrawerOpen, handleDrawerClose }) {
  const theme = useTheme();

  const { instance } = useMsal();

  if (instance) {
    const activeAccount = instance.getActiveAccount();
    if (activeAccount) {
      setAzureUserId(activeAccount.localAccountId);
    }
  }

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
          <NavigationDrawer
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          ></NavigationDrawer>
          <ApplicationsMenu></ApplicationsMenu>
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
          <QuickAdd></QuickAdd>
          <SearchBar></SearchBar>
          <AuthenticatedTemplate>
            <UserProfileForm></UserProfileForm>

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
