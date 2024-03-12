import React from "react";
import logo from "./logo.svg";
import "./App.css";
import CircularProgress from "@mui/material/CircularProgress";
import {
  AuthenticatedTemplate,
  UnauthenticatedTemplate,
  useMsal,
  MsalProvider,
} from "@azure/msal-react";
import { loginRequest } from "./auth-config";
import { Login } from "@microsoft/mgt-react";
import { Button } from "@mui/material";
const WrappedView = () => {
  const { instance } = useMsal();
  const activeAccount = instance.getActiveAccount();

  const handleRedirect = () => {
    instance
      .loginRedirect({
        ...loginRequest,
        prompt: "create",
      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="App">
      <AuthenticatedTemplate>
        {activeAccount ? <h6>Authenticated Successfully</h6> : null}
      </AuthenticatedTemplate>
      <UnauthenticatedTemplate>
        <Button
          onClick={handleRedirect}
          style={{ backgroundColor: "#3C4F18", color: "#FFFF" }}
        >
          Sign Up
        </Button>
      </UnauthenticatedTemplate>
    </div>
  );
};

const App = ({ instance }) => {
  return (
    <MsalProvider instance={instance}>
      <WrappedView></WrappedView>
      <p>
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <p>Version 2</p>
          <CircularProgress color="inherit" />
        </header>
      </p>
    </MsalProvider>
  );
};

export default App;
