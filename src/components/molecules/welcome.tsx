import { Container, Paper, Typography, Box, Button } from "@mui/material";
import logo from "../../logo.svg";

const WelcomeCard = () => {
  return (
    <Container
      maxWidth="sm"
      sx={{
        height: "80vh",
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
        <Typography variant="h4" gutterBottom>
          Welcome
        </Typography>
        <Typography variant="body1" gutterBottom>
          to
        </Typography>
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ height: 150, mb: 4 }}
        />
        <Typography variant="subtitle2" gutterBottom>
          Thank you for choosing our application.
        </Typography>
        <Typography variant="body1" gutterBottom>
          To get started, click next and follow a few simple steps to set up
          your environment.
        </Typography>
  
      </Paper>
    </Container>
  );
};
export default WelcomeCard;
