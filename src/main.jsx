import { createContext, StrictMode, useState } from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { HashRouter } from "react-router-dom"; // ← Import HashRouter

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
      <HashRouter>
        <App />
      </HashRouter>
    </Context.Provider>
  );
};

const container = document.getElementById("root");

if (!container.__reactRoot) {
  const root = createRoot(container);
  container.__reactRoot = root;
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
