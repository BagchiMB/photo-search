import React, { Suspense } from "react";
import ReactDOM from "react-dom";
import reportWebVitals from "./reportWebVitals";

// Global css
import "./index.css";

// Components
import App from "App";
import Loading from "components/global/Loading";

// Snackbar
import { SnackbarProvider } from "notistack";
import { SnackbarUtilsConfigurator } from "shared/snackbar/utils";

// Material UI
import { MuiThemeProvider } from "@material-ui/core/styles";

// Theme
import theme from "./theme";

ReactDOM.render(
  <Suspense fallback={<Loading />}>
    <MuiThemeProvider theme={theme}>
      <SnackbarProvider>
        <SnackbarUtilsConfigurator />
        <App />
      </SnackbarProvider>
    </MuiThemeProvider>
  </Suspense>,
  document.getElementById("root")
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
