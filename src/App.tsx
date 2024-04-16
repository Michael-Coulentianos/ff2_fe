import { useState } from "react";
import { styled } from "@mui/material/styles";
import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import Routing from "./routing";

// import { loginRequest } from "./auth-config";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 5,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  }),
}));
const WrappedView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();
  console.log(activeAccount);
  return (
    <div>
      <AuthenticatedTemplate>
        {activeAccount ? <h6>Authentication successfull - Sign In</h6> : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        {activeAccount ? <h6>Authentication unsuccessfull - Sign Up</h6> : null}
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = ({ instance }) => {
  const [open, setOpen] = useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <MsalProvider instance={instance}>
        <WrappedView></WrappedView>
        <Header
          open={open}
          handleDrawerOpen={handleDrawerOpen}
          handleDrawerClose={handleDrawerClose}
        ></Header>
        <Main open={open} sx={{ minHeight: "87vh" }}>
          <Routing />
        </Main>
        <Footer></Footer>
      </MsalProvider>
    </ThemeProvider>
  );
};

export default App;
