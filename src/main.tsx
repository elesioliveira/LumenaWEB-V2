import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { ThemeProvider, CssBaseline } from "@mui/material";
import { customTheme } from "./theme/theme";
import { AppProviders } from "./appProviders/AppProviders";


ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={customTheme}>
      <CssBaseline />
     <AppProviders>
       <App />
     </AppProviders>
    </ThemeProvider>
  </React.StrictMode>
);
