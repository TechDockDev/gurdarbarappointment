import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "@aws-amplify/ui-react/styles.css";
import { ThemeProvider } from "@aws-amplify/ui-react";
import theme from "./theme.tsx";
import "./assets/styles.css";
import { Authenticator } from "@aws-amplify/ui-react";
import { GlobalProvider } from "./context/GlobalContext.tsx";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  // <React.StrictMode>
  <ThemeProvider theme={theme}>
    <Authenticator.Provider>
      <BrowserRouter>
        <GlobalProvider>
          <App />
        </GlobalProvider>
      </BrowserRouter>
    </Authenticator.Provider>
  </ThemeProvider>
  // </React.StrictMode>
);
