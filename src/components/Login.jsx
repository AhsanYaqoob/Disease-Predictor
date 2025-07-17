import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { Context } from "../main";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "../styles/Login.css";

const Login = () => {
  const { setIsAuthenticated, setUser } = useContext(Context);
  const navigateTo = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLogin = async (data) => {
    try {
      const res = await axios.post("http://localhost:5000/api/v1/user/login", data, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });

      if (!res || !res.data) {
        throw new Error("No response data received");
      }

      toast.success(res.data.message);
      // Save token to localStorage for persistence
      if (res.data.token) {
        localStorage.setItem("token", res.data.token);
      }
      setIsAuthenticated(true);
      setUser(res.data.user);
      // Add a small delay before navigation to ensure state updates
      setTimeout(() => {
        navigateTo("/home");
      }, 100);
    } catch (error) {
      const errorMessage = error.response?.data?.message || "Login failed. Please try again.";
      toast.error(errorMessage);
    }
  };

  return (
    <div className="login-page">
      <form className="login-container" onSubmit={handleSubmit(handleLogin)}>
        <h2>Login</h2>

        <input
          className="auth-input"
          type="email"
          placeholder="Email"
          required
          {...register("email")}
        />

        <div className="password-field">
          <input
            className="auth-input"
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            required
            {...register("password")}
          />
          <span onClick={() => setShowPassword((prev) => !prev)} className="icon">
            {showPassword ? <VisibilityOff /> : <Visibility />}
          </span>
        </div>

        <p className="forgot-password">
          <Link to={"/password/forgot"}>Forgot your password?</Link>
        </p>

        <button className="auth-btn" type="submit">
          Login
        </button>

        <p className="register-link">
          Don't have an account? <Link to="/signup">Register</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
