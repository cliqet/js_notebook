/* @refresh reload */
import { render } from "solid-js/web";
import { AppContextProvider } from "./context/SessionContext";

import "./index.css";
import App from "./App";

const root = document.getElementById("root");

render(
  () => (
    <AppContextProvider>
      <App />
    </AppContextProvider>
  ),
  root!
);
