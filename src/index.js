import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);
