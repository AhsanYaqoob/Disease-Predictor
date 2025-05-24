import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";

// Create a Context for authentication state
export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

// Context Provider Component
const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <App />
    </Context.Provider>
  );
};

const container = document.getElementById("root");

// Ensure createRoot is only called once
if (!container.__reactRoot) {
  const root = createRoot(container);
  container.__reactRoot = root; // Store root instance to avoid duplication
  root.render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>
  );
} else {
  container.__reactRoot.render(
    <StrictMode>
      <AppWrapper />
    </StrictMode>
  );
}
