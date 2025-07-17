import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";
import { login, resetAuthSlice } from "../store/slices/authSlice";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { loading, error, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter both email and password");
      return;
    }

    try {
      const result = await dispatch(login({ email, password }));

      // Check if the action was successful
      if (result.meta.requestStatus === "fulfilled") {
        toast.success("Logged in successfully");
        navigate("/");
      } else {
        // Error is already handled by the slice
      }
    } catch (err) {
      console.error("Login error:", err);
      // Error is already handled by the slice
    }
  };

  useEffect(() => {
    if (error) {
      // More specific error messages
      if (error.includes("Invalid email or password")) {
        toast.error(
          "Invalid credentials. Please check your email and password."
        );
      } else if (error.includes("account not verified")) {
        toast.error(
          "Please verify your email first. Check your inbox for verification link."
        );
      } else {
        toast.error(error);
      }
      dispatch(resetAuthSlice());
    }
  }, [error, dispatch]);
  if (isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex flex-col justify-center md:flex-row h-screen">
      {/* LEFT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
        <Link
          to="/register"
          className="border-2 border-black rounded-full font-bold w-52 py-2 px-4 text-center hover:bg-black hover:text-white transition duration-300"
        >
          Back
        </Link>

        {/* Logo Centered */}
        <div className="max-w-sm w-full">
          <div className="flex justify-center mb-12">
            <div className="rounded-full flex items-center justify-center">
              <img src={logo} alt="logo" className="h-24 w-auto" />
            </div>
          </div>
          <h1 className="text-4xl font-medium text-center mb-12 overflow-hidden">
            Welcome Back !!
          </h1>
          <p className="text-gray-800 text-center mb-12">
            Please enter your credentials to log in
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px] rounded-bl-[80px]">
        <div>
          <img src={logo_with_title} alt="logo" />
        </div>
        <p className="mb-4">New to our platform? Sign up now.</p>
        <Link
          to="/register"
          className="border-2 mb-8 border-white px-8 w-30 font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
        >
          SIGN UP
        </Link>

        <h2 className="text-2xl font-bold mb-4">Log In</h2>

        <form onSubmit={handleLogin} className="w-full max-w-sm">
          <div className="mb-4">
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2 text-black border border-black rounded-md focus:outline-none"
              required
            />
          </div>
          <div className="mb-4">
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-black border border-black rounded-md focus:outline-none"
              required
              minLength="8"
              maxLength="16"
            />
          </div>

          <div className="mb-6 text-right">
            <Link
              to="/password/forgot"
              className="text-sm font-semibold hover:underline"
            >
              Forgot Password?
            </Link>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full border-2 border-white px-8 font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-50"
          >
            {loading ? "Signing In..." : "SIGN IN"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
