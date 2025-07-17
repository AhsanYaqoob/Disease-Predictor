// App.jsx
import React, { useState, useEffect, useContext, useRef } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import { Context } from "./main";  // Import context from main.jsx
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Authentication & User Management
import Login from "./components/Login";
import Signup from "./components/Register"; // Ensure it's correctly imported
import ForgotPassword from "./components/ForgotPassword";
import ResetPassword from "./components/ResetPassword";
import OtpVerification from "./components/OtpVerification";

// Main Components
import Home from "./components/Home";
import About from "./components/About";
import Services from "./components/Services";
import Hospitals from "./components/Hospitals";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Chatbot from "./components/Chatbot";

const App = () => {
  const servicesRef = useRef(null);
  const { setIsAuthenticated, setUser } = useContext(Context);
  const [isAuthenticated, setAuthState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      setAuthState(false);
      setLoading(false);
      return;
    }

    const getUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/v1/user/me", { withCredentials: true });
        setUser(res.data.user);
        setAuthState(true);
      } catch {
        setUser(null);
        setAuthState(false);
      } finally {
        setLoading(false);
      }
    };

    getUser();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        {/* Authentication Routes */}
        <Route path="/" element={isAuthenticated ? <Navigate to="/home" replace /> : <Navigate to="/login" replace />} />
        <Route path="/login" element={<Login setIsAuthenticated={setAuthState} />} />
        <Route path="/signup" element={<Signup setIsAuthenticated={setAuthState} />} />
        <Route path="/otp-verification/:email/:phone" element={<OtpVerification />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />

        {/* Protected Home Page (Only for Authenticated Users) */}
        <Route
          path="/home"
          element={
            isAuthenticated ? (
              <>
                <Navbar />
                <main>
                  <div id="home">
                    <Home servicesRef={servicesRef} />
                  </div>
                  <div id="services">
                    <Services ref={servicesRef} />
                  </div>
                  <div id="hospitals">
                    <Hospitals />
                  </div>
                  <div id="about">
                    <About />
                  </div>
                </main>
                <Footer />
                <Chatbot />
              </>
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* Google OAuth Redirect */}
        <Route path="/auth/google/callback" element={<GoogleCallback setIsAuthenticated={setAuthState} />} />

        {/* Redirect all other routes to login */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
      <ToastContainer theme="colored" />
    </Router>
  );
};

// Component to handle Google OAuth callback
const GoogleCallback = ({ setIsAuthenticated }) => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const token = queryParams.get("token");

    if (token) {
      console.log("Token Extracted from URL:", token);
      localStorage.setItem("token", token);
      setIsAuthenticated(true);
      navigate("/home");
    } else {
      console.error("No Token Found in URL");
      navigate("/login");
    }
  }, [location, navigate, setIsAuthenticated]);

  return null;
};

export default App;
