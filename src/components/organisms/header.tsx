import SearchBar from "../molecules/searchBar";
import {
  Box,
  CssBaseline,
  IconButton,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import NavigationDrawer from "./navigationDrawer";
import ExitToAppIcon from "@mui/icons-material/ExitToApp";
import EditIcon from "@mui/icons-material/Edit";
import menuIcon from "../../assets/icons/menuIcon.svg";
import MuiAppBar, { AppBarProps as MuiAppBarProps } from "@mui/material/AppBar";
import FFlogo from "../../assets/logos/fflogoGreen.png";

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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="open apps"
            onClick={undefined}
            sx={{ m: 1 }}
          >
            <img src={menuIcon} alt="menuIcon" />
          </IconButton>

          <img src={FFlogo} alt="FFlogo" height={"40px"} width={"40px"} />
          <Typography
            flexGrow={1}
            color={theme.palette.primary.main}
            variant="h6"
            marginLeft={2}
          >
            Farmers Friend
          </Typography>
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
          <IconButton
            aria-label="edit"
            sx={{
              color: theme.palette.primary.main,
            }}
          >
            <ExitToAppIcon
              sx={{
                color: theme.palette.primary.main,
                width: "30px",
                height: "30px",
              }}
            />
          </IconButton>
        </Toolbar>
      </AppBar>
    </Box>
  );
}
