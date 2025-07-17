import React, { useEffect, useState } from "react";
import logo from "../assets/black-logo.png";
import { Link, useParams, Navigate, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { otpVerification, resetAuthSlice } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import logo_with_title from "../assets/logo-with-title.png";
const OTP = () => {
  const { email } = useParams();
  const [otp, setOtp] = useState("");
  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleOtpVerification = (e) => {
    e.preventDefault(); // ✅ fixed typo
    dispatch(otpVerification(email, otp));
  };

  useEffect(() => {
    // if (message) {
    //   toast.success(message);
    //   navigateTo("/login");
    // }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, navigateTo]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* LEFT SIDE */}
        <div className="w-full md:w-1/2 flex items-center justify-center bg-white p-8 relative">
          {/* Back Button */}
          {/* <Link
            to="/login"
            className="border-2 border-black rounded-3xl font-bold w-52 py-2 px-4 fixed top-10 left-5 text-end hover:bg-black hover:text-white transition duration-300"
          >
            Back
          </Link> */}
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
              Check your Mailbox
            </h1>
            <p className="text-gray-800 text-center mb-12">
              Please enter the otp to proceed
            </p>
          </div>
        </div>

        {/* RIGHT SIDE */}

        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tl-[80px]  rounded-bl-[80px]">
          <div>
            <img src={logo_with_title} alt="logo" />
          </div>
          <p> New to our platform? Sign up now.</p>
          <Link
            to={"/register"}
            className="border-2 mt-5 border-white px-8 w-30 font-semibold bg-black text-white py-2 rounded-lg hover:bg-white hover:text-black transition "
          >
            {" "}
            SIGN UP
          </Link>
          {/* 
          <Link
            to="/register"
            className="border-2  border-black rounded-full font-bold w-52 py-2 px-4 text-center hover:bg-black hover:text-white transition duration-300"
          > */}
          {/* SIGN UP
          </Link> */}
          <h2 className="text-2xl font-bold mb-4">OTP Verification</h2>
          <form onSubmit={handleOtpVerification} className="w-full max-w-sm">
            <input
              type="number"
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="w-full px-4 border  border-black rounded-md focus:outline-none"
            />
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800 transition"
            >
              {loading ? "Verifying..." : "Verify OTP"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default OTP;
