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
      light: "#ECBA5E",
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
  typography: {
    fontFamily: [
      "Poppins",
      "Inter",
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
});

export default theme;
