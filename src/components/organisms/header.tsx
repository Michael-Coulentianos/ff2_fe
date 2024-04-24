import SearchBar from "../molecules/searchBar";
import {
  Box,
  Button,
  CssBaseline,
  IconButton,
  Link,
  Toolbar,
  styled,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import NavigationDrawer from "./navigationDrawer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import FFlogo from "../../assets/logos/fflogoGreen.png";
import ApplicationsMenu from "../molecules/appMenu";
import { loginRequest } from "../../../src/auth-config";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
} from "@azure/msal-react";
import { UserProfileForm } from "./profileSettings";
const drawerWidth = 240;

interface AppBarProps extends MuiAppBarProps {
  open?: boolean;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})<AppBarProps>(({ theme, open }) => ({
  transition: theme.transitions.create(["margin", "width"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: `${drawerWidth}px`,
    transition: theme.transitions.create(["margin", "width"], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

export default function Header({ open, handleDrawerOpen, handleDrawerClose }) {
  const theme = useTheme();

  const { instance } = useMsal();

  // if (instance) {
  //   let activeAccount;
  //   activeAccount = instance.getActiveAccount();
  // }

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
      <AppBar
        sx={{ backgroundColor: theme.palette.common.white }}
        position="sticky"
        open={open}
      >
        <Toolbar>
          <NavigationDrawer
            open={open}
            handleDrawerOpen={handleDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          ></NavigationDrawer>
          <ApplicationsMenu></ApplicationsMenu>
          <Link href={"/"} underline="none" sx={{ mr: 1 }}>
            <img src={FFlogo} alt="FFlogo" height={"40px"} width={"40px"} />
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
          <IconButton
            aria-label="edit"
            sx={{
              color: "white",
              backgroundColor: theme.palette.secondary.main,
              width: "30px",
              height: "30px",
            }}
          >
            <EditIcon />
          </IconButton>
          <SearchBar></SearchBar>

          <AuthenticatedTemplate>
            <UserProfileForm></UserProfileForm>
            <IconButton
              aria-label="edit"
              sx={{
                color: theme.palette.primary.main,
              }}
              onClick={handleLogoutRedirect}
            >
              <ExitToAppIcon
                sx={{
                  color: theme.palette.primary.main,
                  width: "30px",
                  height: "30px",
                }}
              />
            </IconButton>
          </AuthenticatedTemplate>
          <UnauthenticatedTemplate>
            <Button
              variant="outlined"
              onClick={handleLoginRedirect}
              sx={{ height: "30px" }}
            >
              Sign in
            </Button>
          </UnauthenticatedTemplate>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
