// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ResetPassword from "./pages/ResetPassword";
import OTP from "./pages/OTP";
import { ToastContainer } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

// import { getUser } from "./store/slices/authSlice";
// import { fetchAllUsers } from "./store/slices/userSlice";

const App = () => {
  // const dispatch = useDispatch();
  // const { user, isAuthenticated } = useSelector((state) => state.auth);

  // useEffect(() => {
  //   dispatch(getUser());
  //   if (isAuthenticated && user?.role === "Admin") {
  //     dispatch(fetchAllUsers());
  //   }
  // }, [dispatch, isAuthenticated, user?.role]);

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/otp-verification/:email" element={<OTP />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
      </Routes>
      <ToastContainer theme="dark" />
    </Router>
  );
};

export default App;
