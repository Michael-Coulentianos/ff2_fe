import { useState } from "react";
import { styled } from "@mui/material/styles";
import "./App.css";
import { MsalProvider } from "@azure/msal-react";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import Footer from "./components/organisms/footer";
import Header from "./components/organisms/header";
import Routing from "./routing";

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
