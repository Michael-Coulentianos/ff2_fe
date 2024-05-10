import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../auth-config";
import { setAzureUserId } from "../../apiService";
import { Box, Paper, Typography, Button, Container } from "@mui/material";
import logo from "../../logo.svg";

const LogoutPage = () => {
  const { instance } = useMsal();

  React.useEffect(() => {
    const activeAccount = instance.getActiveAccount();
    if (activeAccount) {
      setAzureUserId(activeAccount.localAccountId);
    }
  }, [instance]);

  const handleLoginRedirect = async () => {
    try {
      await instance.loginRedirect(loginRequest);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Paper
        elevation={3}
        sx={{
          p: 4,
          pt: 9,
          pb: 9,
          textAlign: "center",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          alignContent: "center",
        }}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ height: 200, mb: 4 }}
        />
        <Typography variant="h5" gutterBottom>
          You have been logged out.
        </Typography>
        <Typography variant="body1" gutterBottom>
          Please sign in again by clicking the button below.
        </Typography>
        <Button
          variant="contained"
          color="primary"
          onClick={handleLoginRedirect}
          sx={{ mt: 2 }}
        >
          Sign in
        </Button>
      </Paper>
    </Container>
  );
};

export default LogoutPage;
