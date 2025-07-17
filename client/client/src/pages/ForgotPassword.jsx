import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

import { forgotPassword, resetAuthSlice } from "../store/slices/authSlice";
import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();
  const { loading, error, message, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleForgotPassword = async (e) => {
    e.preventDefault();
    dispatch(forgotPassword(email));
  };
  useEffect(() => {
    if (message) {
      toast.success(message);
      dispatch(resetAuthSlice());
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, loading]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }
  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] ronded-br-[80px]">
          <div className="text-center h-[450px">
            <div className="flex justify-center md-12">
              <img
                src={logo_with_title}
                alt="logo"
                className="mb-12 h-44 w-auto"
              />
              <h3 className="text-gray-300 mb-12 max-w-[320px] mx-auto">
                "Your premier digital library for borrowing and reading books"
              </h3>
            </div>
          </div>
          <div className="w-full  md:w-1/2 bg-white  md:flex flex-col items-center justify-center  p-8 relative">
            <Link
              to={"/login"}
              className="border-2 mt-5 border-white px-8 w-30 font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition "
            >
              Back
            </Link>
            <div className="w-full max-w-sm">
              <div className="flex justify-center mb-12">
                <div>
                  <img src={logo} alt="logo" className="h-24 w-auto" />
                </div>
              </div>
              <h1 className="text-4xl font-medium text-center mb-5 overflow-hidden">
                Forgot Password
              </h1>
              <p className="text-gray-800 text-center mb-12">
                Please enter your email
              </p>
              <form onSubmit={handleForgotPassword} className="w-full max-w-sm">
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

                <button
                  type="submit"
                  disabled={loading ? true : false}
                  className="w-full border-2 border-white px-8 font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition disabled:opacity-50"
                >
                  {loading ? "Reset Password..." : "RESET PASSWORD"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ForgotPassword;
