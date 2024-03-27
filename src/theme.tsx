import { createTheme } from "@mui/material/styles";

// Define the theme
const theme = createTheme({
  palette: {
    primary: {
      main: "#3C4F1E",
      light: "#77845D",
    },
    secondary: {
      main: "#F1A81E",
      light: "#F3D9DA",
    },
    error: {
      main: "#f44336",
    },
    warning: {
      main: "#ff9800",
    },
    info: {
      main: "#2196f3",
    },
    success: {
      main: "#4caf50",
    },
    text: {
      primary: "#333",
      secondary: "#555",
      disabled: "#aaa",
    },
  },
});

export default theme;
