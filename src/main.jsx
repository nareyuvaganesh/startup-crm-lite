import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.jsx";

import { LeadProvider } from "./context/LeadContext";
import { ProfileProvider } from "./context/ProfileContext";
import { ThemeProvider } from "./context/ThemeContext";
import ThemeAwareToaster from "./components/common/ThemeAwareToaster";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <LeadProvider>
      <ProfileProvider>
        <ThemeProvider>
          <App />
          <ThemeAwareToaster />
        </ThemeProvider>
      </ProfileProvider>
    </LeadProvider>
  </StrictMode>
);
