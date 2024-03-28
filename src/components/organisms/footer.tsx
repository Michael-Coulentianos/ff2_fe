import { createTheme, ThemeProvider, useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "@mui/material/Link";

export default function Footer() {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position:"sticky",
        paddingTop: 1,
        paddingBottom: 1,
        backgroundColor: theme.palette.primary.light,
        textAlign: "center",
      }}
    >
      <Typography color="text.light">
        {"Copyright © "}
        <Link color="inherit" href="https://farmersfriend.tech/">
          Farmers Friend
        </Link>{" "}
        {new Date().getFullYear()}
        {"."}
      </Typography>
    </Box>
  );
}
