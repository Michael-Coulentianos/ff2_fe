import React, { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import "./App.css";
import {
  AuthenticatedTemplate,
  MsalProvider,
  UnauthenticatedTemplate,
} from "@azure/msal-react";
import { ThemeProvider } from "@mui/material";
import { BrowserRouter as Router } from "react-router-dom";
import theme from "./theme";
import Header from "./components/organisms/header";
import Routing from "./routing";
import LogoutPage from "./components/pages/loggedOut";
import NavigationDrawer from "./components/organisms/navigationDrawer";
import { useGlobalState } from "./GlobalState";
import StepperForm from "./components/organisms/stepperForm";
import Footer from "./components/organisms/footer";

const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
  open?: boolean;
}>(({ theme, open }) => ({
  flexGrow: 1,
  padding: theme.spacing(3),
  transition: theme.transitions.create("margin", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  marginLeft: 55,
  ...(open && {
    transition: theme.transitions.create("margin", {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 240,
  }),
}));

const App = ({ instance }) => {
  const [open, setOpen] = useState(true);
  const { selectedOrganization } = useGlobalState();

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  return (
    <ThemeProvider theme={theme}>
      <MsalProvider instance={instance}>
        <UnauthenticatedTemplate>
          <div
            style={{
              backgroundColor: theme.palette.primary.main,
              minHeight: "111vh",
            }}
          >
            <LogoutPage />
          </div>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
          <Router>
            <Header />
            {selectedOrganization && (
              <NavigationDrawer
                openDrawer={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
              />
            )}
            <Main
              open={selectedOrganization ? open : false}
              sx={{
                minHeight: "102vh",
                marginTop: 6,
                padding: 0,
              }}
            ><Routing /> 
            </Main>
            {selectedOrganization && <Footer open={open} />}
          </Router>
        </AuthenticatedTemplate>
      </MsalProvider>
    </ThemeProvider>
  );
};

export default App;
