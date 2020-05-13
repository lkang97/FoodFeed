import React from "react";
import { createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#9b8e9b",
      main: "#6d616d",
      dark: "#423742",
      contrastText: "#ffffff",
    },
    secondary: {
      light: "#52c7b8",
      main: "#009688",
      dark: "#00675b",
      contrastText: "#000000",
    },
    spacing: 4,
  },
});

const Theme = (props) => {
  return <ThemeProvider theme={theme}>{props.children}</ThemeProvider>;
};

export default Theme;
