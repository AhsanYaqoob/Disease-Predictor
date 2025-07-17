// main.jsx
import React, { createContext, StrictMode, useState } from "react";
import { createRoot }  from "react-dom/client";
import App from "./App.jsx";
  // Import App from index.jsx now

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
const root = createRoot(container);

root.render(
  <StrictMode>
    <AppWrapper />
  </StrictMode>
);
