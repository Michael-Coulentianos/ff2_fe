import "./App.css";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
import { loginRequest } from "./auth-config";
import { ThemeProvider } from "@mui/material";
import theme from "./theme";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import HomeDashboardPage from "./components/pages/HomeDashboard";
// import MyFarmPage from "./pages/MyFarm";
// import OperationsPage from "./components/pages/Operations";
// import CropClimatePage from "./components/pages/ropClimate";
// import AdminastrationPage from "./components/pages/Adminastration";

const WrappedView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  // const handleRedirect = () => {
  //   instance
  //     .loginRedirect({
  //       ...loginRequest,
  //       prompt: "create",
  //     })
  //     .catch((error) => console.log(error));
  // };

  // april -21days challenge excercise, marathon 5 10 21, areobics
  // Isaiah 60:18 - no more violence; walls salvation; gates parseIsolatedEntityName;

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
  return (
    <ThemeProvider theme={theme}>
      <MsalProvider instance={instance}>
        <WrappedView></WrappedView>
        <Router>
          <Routes>
            <Route path="/" element={<HomeDashboardPage props={undefined} />} />
            {/* <Route path="/farm" element={<MyFarmPage/>} />
            <Route path="/operations" element={<OperationsPage />} />
            <Route path="/cropclimate" element={<CropClimatePage />} />
            <Route path="/adminastration" element={<AdminastrationPage />} /> */}
          </Routes>
        </Router>
      </MsalProvider>
    </ThemeProvider>
  );
};

export default App;
