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
              minHeight: "100vh",
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
                open={open}
                handleDrawerOpen={handleDrawerOpen}
                handleDrawerClose={handleDrawerClose}
              />
            )}
            <Main
              open={selectedOrganization ? open : false}
              sx={{
                minHeight: "88.3vh",
                marginTop: 6,
                padding: "10px",
              }}
            >
              {selectedOrganization ? <Routing /> : <StepperForm />}
            </Main>
            {selectedOrganization && <Footer open={open} />}
          </Router>
        </AuthenticatedTemplate>
      </MsalProvider>
    </ThemeProvider>
  );
};

export default App;

// import React, { useState, useEffect } from "react";
// import { styled } from "@mui/material/styles";
// import "./App.css";
// import {
//   AuthenticatedTemplate,
//   MsalProvider,
//   UnauthenticatedTemplate,
// } from "@azure/msal-react";
// import { ThemeProvider } from "@mui/material";
// import { BrowserRouter as Router } from "react-router-dom";
// import theme from "./theme";
// import Header from "./components/organisms/header";
// import Routing from "./routing";
// import LogoutPage from "./components/pages/loggedOut";
// import NavigationDrawer from "./components/organisms/navigationDrawer";
// import StepperForm from "./components/organisms/stepperForm";
// import Footer from "./components/organisms/footer";
// import { getOrganizationFarms, getOrganizations } from "./api-ffm-service";
// import { useFetchData } from "./hooks/useFethData";
// import Loading from "./components/pages/loading";

// const Main = styled("main", { shouldForwardProp: (prop) => prop !== "open" })<{
//   open?: boolean;
// }>(({ theme, open }) => ({
//   flexGrow: 1,
//   padding: theme.spacing(3),
//   transition: theme.transitions.create("margin", {
//     easing: theme.transitions.easing.sharp,
//     duration: theme.transitions.duration.leavingScreen,
//   }),
//   marginLeft: 5,
//   ...(open && {
//     transition: theme.transitions.create("margin", {
//       easing: theme.transitions.easing.easeOut,
//       duration: theme.transitions.duration.enteringScreen,
//     }),
//     marginLeft: 240,
//   }),
// }));

// const App = ({ instance }) => {
//   const [open, setOpen] = useState(true);
//   const [organizations, setOrganizations] = useState<any[]>([]);
//   const [farms, setFarms] = useState<any[]>([]);
//   const [ready, setReady] = useState(false);
//   const [isLoading, setIsLoading] = useState(false);

//   useFetchData(getOrganizationFarms, setFarms, setIsLoading);
//   useFetchData(getOrganizations, setOrganizations, setIsLoading);

//   const handleDrawerOpen = () => {
//     setOpen(true);
//   };

//   const handleDrawerClose = () => {
//     setOpen(false);
//   };

//   if (farms.length > 0 && organizations.length > 0) {
//     if (ready === false) {
//       setReady(true);
//     }
//   }

//   const renderContent = () => {
//     if (isLoading) {
//       return <Loading />;
//     } else {
//       if (ready && !isLoading) {
//         return <Routing />;
//       } else if (!ready && !isLoading) {
//         <StepperForm />;
//       }
//     }
//   };

//   return (
//     <ThemeProvider theme={theme}>
//       <MsalProvider instance={instance}>
//         <UnauthenticatedTemplate>
//           <div
//             style={{
//               backgroundColor: theme.palette.primary.main,
//               minHeight: "100vh",
//             }}
//           >
//             <LogoutPage />
//           </div>
//         </UnauthenticatedTemplate>
//         <AuthenticatedTemplate>
//           <Router>
//             <Header />
//             {ready && (
//               <NavigationDrawer
//                 open={open}
//                 handleDrawerOpen={handleDrawerOpen}
//                 handleDrawerClose={handleDrawerClose}
//               />
//             )}
//             <Main
//               open={ready ? open : false}
//               sx={{
//                 minHeight: "88.3vh",
//                 marginTop: 6,
//                 padding: "10px",
//               }}
//             >
//               {renderContent()}
//             </Main>
//             {ready && <Footer open={open} />}
//           </Router>
//         </AuthenticatedTemplate>
//       </MsalProvider>
//     </ThemeProvider>
//   );
// };

// export default App;
