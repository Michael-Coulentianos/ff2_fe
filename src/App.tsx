import { useEffect, useState } from "react";
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
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import Routing from "./routing";
import LogoutPage from "./components/pages/loggedOut";
import NavigationDrawer from "./components/organisms/navigationDrawer";
import { useGlobalState } from "./GlobalState";
import StepperForm from "./components/organisms/stepperForm";
import { getOrganizations, setAzureUserId } from "./api-ffm-service";
import { Organization } from "./models/organization.interface";

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

const App = ({ instance }) => {
  const [open, setOpen] = useState(true);
  const { setSelectedOrganization, activeAccount, setActiveAccount } = useGlobalState();
  const [organizations, setOrganizations] = useState<Organization[]>([]);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    if (instance) {
      const account = instance.getActiveAccount();
      if (account && !activeAccount) {
        setActiveAccount(account);
        setAzureUserId(account.localAccountId);

        getOrganizations().then((orgs) => {
          setOrganizations(orgs);
          if (orgs.length > 0) {
            setSelectedOrganization(orgs[0]);
          }
        });
      }
    }
  }, [instance, activeAccount, setActiveAccount, setSelectedOrganization]);

  return (
    <ThemeProvider theme={theme}>
      <MsalProvider instance={instance}>
        <UnauthenticatedTemplate>
          <div
            style={{
              backgroundColor: theme.palette.primary.main,
              minHeight: "100vh",
            }}
          >
            <LogoutPage />
          </div>
        </UnauthenticatedTemplate>
        <AuthenticatedTemplate>
        <Router>
            <Header />
            <NavigationDrawer
              open={open}
              handleDrawerOpen={handleDrawerOpen}
              handleDrawerClose={handleDrawerClose}
            />
            <Main open={open} sx={{ minHeight: '86vh', marginTop: 2, padding: '10px' }}>
              <Routing />
            </Main>
            <Footer open={open} />
          </Router>
          {/* <Router>
            <Header />
            {selectedOrganization && (
              <NavigationDrawer
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
              />
            )}
            <Main
              open={selectedOrganization ? open : false}
              sx={{
                minHeight: "87vh",
                marginTop: selectedOrganization ? 5 : 6,
                padding: "10px",
              }}
            >
              {selectedOrganization ? <Routing /> : <StepperForm />}
            </Main>
            {selectedOrganization && <Footer open={open} />}
          </Router> */}
        </AuthenticatedTemplate>
      </MsalProvider>
    </ThemeProvider>
  );
};

export default App;
