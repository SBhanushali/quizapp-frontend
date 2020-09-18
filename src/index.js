import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { theme, ThemeProvider, CSSReset } from "@chakra-ui/core";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.render(
  <ThemeProvider theme={theme}>
    <CSSReset />
    <React.StrictMode>
      <Router>
        <App />
      </Router>
    </React.StrictMode>
  </ThemeProvider>,
  document.getElementById("root")
);
