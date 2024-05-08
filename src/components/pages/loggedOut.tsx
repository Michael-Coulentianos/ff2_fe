// import React from "react";
// import Paper from "@mui/material/Paper";
// import Typography from "@mui/material/Typography";
// import Button from "@mui/material/Button";
// import { loginRequest } from "../../../src/auth-config";
// import { useMsal } from "@azure/msal-react";
// import { setAzureUserId } from "../../apiService";
// import { Grid } from "@mui/material";
// import theme from "../../theme";
// import logo from "../../logo.svg";

// const LogoutPage: React.FC = () => {
//   const { instance } = useMsal();

//   if (instance) {
//     const activeAccount = instance.getActiveAccount();
//     if (activeAccount) {
//       setAzureUserId(activeAccount.localAccountId);
//     }
//   }

//   const handleLoginRedirect = () => {
//     instance.loginRedirect(loginRequest).catch((error) => console.log(error));
//   };
//   return (
//     <Grid
//       container
//       sx={{
//         display: "flex",
//         justifyContent: "center",
//         alignItems: "center",
//         height: "100vh",
//         backgroundColor: theme.palette.primary.main,
//       }}
//     >
//       <Paper
//         sx={{
//           display: "center",
//           alignItems: "center",
//           alignContent: "center",
//           p: 5,
//         }}
//       >
//         <Grid item xs={6}>
//           <img
//             src={logo}
//             className="App-logo"
//             alt="logo"
//             height={"260px"}
//             width={"260px"}
//           />
//         </Grid>
//         <Grid
//           item
//           xs={6}
//           sx={{
//             display: "flex",
//             flexDirection: "column",
//             alignItems: "center",
//           }}
//         >
//           <Typography
//             sx={{
//               textAlign: "center",
//               m: 2,
//             }}
//           >
//             You have been logged out. <br />
//             Please sign in again by clicking the button below.
//           </Typography>
//           <Button
//             variant="outlined"
//             onClick={handleLoginRedirect}
//             sx={{ maxHeight: "25px" }}
//           >
//             <Typography noWrap>Sign in</Typography>
//           </Button>
//         </Grid>
//       </Paper>
//     </Grid>
//   );
// };

// export default LogoutPage;

import React from "react";
import { useMsal } from "@azure/msal-react";
import { loginRequest } from "../../../src/auth-config";
import { setAzureUserId } from "../../apiService";
import { Box, Paper, Typography, Button, Container } from "@mui/material";
import theme from "../../theme";
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
