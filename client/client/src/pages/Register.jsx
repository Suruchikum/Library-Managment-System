import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useNavigate, Link } from "react-router-dom";
import { resetAuthSlice, register } from "../store/slices/authSlice";
import { toast } from "react-toastify";

import logo from "../assets/black-logo.png";
import logo_with_title from "../assets/logo-with-title.png";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const dispatch = useDispatch();
  const navigateTo = useNavigate();

  const { loading, error, message, user, isAuthenticated } = useSelector(
    (state) => state.auth
  );

  const handleRegister = (e) => {
    e.preventDefault();
    const data = {
      name,
      email,
      password,
    };
    dispatch(register(data));
  };
  // const handleRegister = (e) => {
  //   e.preventDefault();
  //   const data = {
  //     name: name.trim(),
  //     email: email.trim(),
  //     password: password,
  //   };
  //   dispatch(register(data));
  // };

  useEffect(() => {
    if (message) {
      navigateTo(`/otp-verification/${email}`);
    }
    if (error) {
      toast.error(error);
      dispatch(resetAuthSlice());
    }
  }, [dispatch, error, message, navigateTo, email]);

  if (isAuthenticated) {
    return <Navigate to="/" />;
  }

  return (
    <>
      <div className="flex flex-col justify-center md:flex-row h-screen">
        {/* Left Side (Black Section) */}
        <div className="hidden w-full md:w-1/2 bg-black text-white md:flex flex-col items-center justify-center p-8 rounded-tr-[80px] rounded-br-[80px]">
          <div className="text-center space-y-4">
            <img src={logo_with_title} alt="logo" className="w-3/4 mx-auto" />
            <p className="text-gray-300 mb-12">Already have an account?</p>
            <Link
              to="/login"
              className="bg-white text-black px-6 py-2 rounded hover:bg-gray-200"
            >
              Sign In
            </Link>
          </div>
        </div>

        {/* Right Side (Register Form) */}
        <div className="w-full md:w-1/2 flex items-center justify-center p-8">
          <form
            onSubmit={handleRegister}
            className="bg-white shadow-md rounded px-8 pt-6 pb-8 w-full max-w-md"
          >
            <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
            <img src={logo} alt="logo" className="h-auto w-24 object-cover" />
            <p className="text-gray-800 text-center mb-12">
              Please provide your information to sign up.
            </p>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="border rounded w-full px-3 py-2"
              />
            </div>

            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="border rounded w-full px-3 py-2"
              />
            </div>

            <div className="mb-6">
              <label className="block text-gray-700 mb-2">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="border rounded w-full px-3 py-2"
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-black text-white py-2 rounded hover:bg-gray-800"
            >
              {loading ? "Registering..." : "Sign Up"}
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default Register;
