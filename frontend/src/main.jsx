import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";
import { BrowserRouter as Router } from "react-router-dom";

import { SidebarProvider } from "./context/SidebarContext.jsx";

createRoot(document.getElementById("root")).render(
  <Router>
    <StrictMode>
      <SidebarProvider>
        <App />
      </SidebarProvider>
    </StrictMode>
  </Router>,
);
