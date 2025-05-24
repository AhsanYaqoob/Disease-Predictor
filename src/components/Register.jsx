import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import "../styles/Register.css";

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL || "http://localhost:5000";

const Register = () => {
  const navigateTo = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      verificationMethod: "email",
    },
  });

  const handleRegister = async (data) => {
    try {
      data.phone = `+92${data.phone}`;

      const response = await axios.post(
        `${API_BASE_URL}/api/v1/user/register`,
        data,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        }
      );

      toast.success(response.data.message);
      navigateTo(`/otp-verification/${data.email}/${data.phone}`);
    } catch (error) {
      const errorMessage =
        error.response?.data?.message || "Registration failed. Please try again.";
      toast.error(errorMessage);
      console.error("Registration Error:", error);
    }
  };

  return (
    <div className="register-container">
      <form className="auth-form" onSubmit={handleSubmit(handleRegister)}>
        <h2>Register</h2>

        <input type="text" placeholder="Name" required {...register("name")} />
        <input type="email" placeholder="Email" required {...register("email")} />

        <div className="phone-input">
          <span>+92</span>
          <input type="number" placeholder="Phone" required {...register("phone")} />
        </div>

        <input
          type="password"
          placeholder="Password"
          required
          {...register("password")}
        />

        <div className="verification-method">
          <p>Select Verification Method</p>
          <div className="wrapper">
            <label style={{ display: "flex", alignItems: "center", gap: "8px" }}>
              <input
                type="radio"
                name="verificationMethod"
                value="email"
                {...register("verificationMethod")}
                required
              />
              Email
            </label>
          </div>
        </div>

        <button type="submit">Register</button>

        <p className="login-redirect">
          Already have an account?{" "}
          <span onClick={() => navigateTo("/login")} className="login-link">
            Login
          </span>
        </p>
      </form>
    </div>
  );
};

export default Register;
