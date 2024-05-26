import { useTheme } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "@mui/material/Link";

export default function Footer({ open }) {
  const theme = useTheme();
  return (
    <Box
      sx={{
        position: "sticky",
        paddingTop: 1,
        paddingBottom: 1,
        backgroundColor: theme.palette.primary.dark,
        textAlign: "center",
        minHeight: "40px",
        marginLeft: open ? "240px" : "0px",
      }}
    >
      <Typography color="white">
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
