import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { resetPassword, resetAuthSlice } from "../store/slices/authSlice";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const ResetPassword = () => {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const { token } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleResetPassword = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ password, confirmPassword }, token));
  };

  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
      navigate("/login");
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, navigate]);

  if (isAuthenticated) return <Navigate to="/" />;

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Left Black Panel */}
      {/* <div className="hidden md:flex w-full md:w-1/2 bg-black text-white flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-center">
          <img src={logo_with_title} alt="logo" className="mb-12 h-44 w-auto" />
          <h3 className="text-gray-300 max-w-[320px] mx-auto">
            "Your premier digital library for borrowing and reading books"
          </h3>
        </div>
      </div> */}
      <div className="hidden md:flex w-full md:w-1/2 bg-black text-white flex-col items-start justify-center p-8 pl-24 rounded-tr-[80px] rounded-br-[80px]">
        <div className="text-left space-y-6">
          <img src={logo_with_title} alt="logo" className="h-44 w-auto" />
          <h3 className="text-gray-300 max-w-[320px]">
            "Your premier digital library for borrowing and reading books"
          </h3>
        </div>
      </div>

      {/* Right White Panel */}
      <div className="w-full md:w-1/2 bg-white flex flex-col items-center justify-center p-8 relative">
        <Link
          to="/login"
          className="border-2 mb-5 border-black px-8 font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition"
        >
          Back
        </Link>

        <div className="w-full max-w-sm">
          <div className="flex justify-center mb-8">
            <img src={logo} alt="logo" className="h-24 w-auto" />
          </div>

          <h1 className="text-3xl font-bold text-center mb-4">
            Reset Password
          </h1>
          <p className="text-gray-800 text-center mb-6">
            Please enter your new password
          </p>

          <form onSubmit={handleResetPassword} className="space-y-4">
            <input
              type="password"
              placeholder="New Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 text-black border border-black rounded-md focus:outline-none"
              required
            />
            <input
              type="password"
              placeholder="Confirm Password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full px-4 py-2 text-black border border-black rounded-md focus:outline-none"
              required
            />

            <button
              type="submit"
              disabled={loading}
              className="w-full border-2 border-black px-8 font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-50"
            >
              {loading ? "Resetting..." : "RESET PASSWORD"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
