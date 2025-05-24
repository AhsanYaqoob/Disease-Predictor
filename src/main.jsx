import React, { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router } from "react-router-dom";
import App from "./App.jsx";

export const Context = createContext({
  isAuthenticated: false,
  setIsAuthenticated: () => {},
  user: null,
  setUser: () => {},
});

const AppWrapper = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);

  return (
    <Context.Provider value={{ isAuthenticated, setIsAuthenticated, user, setUser }}>
      <Router>
        <App />
      </Router>
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
