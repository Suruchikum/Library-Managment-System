import { catchAsyncErrors } from "./catchAsyncErrors.js";
import ErrorHandler from "./errorMiddleware.js";
import jwt from "jsonwebtoken";
import { User } from "../models/userModel.js";

export const isAuthenticated = catchAsyncErrors(async (req, res, next) => {
  // 1. Get token from cookies or Authorization header
  const token =
    req.cookies.token ||
    req.headers.authorization?.replace("Bearer ", "") ||
    req.headers["x-access-token"];

  if (!token) {
    return next(new ErrorHandler("Please login to access this resource", 401));
  }

  try {
    // 2. Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    // 3. Find user in database
    const user = await User.findById(decoded.id).select("-password");

    if (!user) {
      // Clear invalid token cookie
      res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
      });
      return next(new ErrorHandler("User not found. Please login again", 401));
    }

    // 4. Check if account is verified
    if (!user.accountVerified) {
      return next(new ErrorHandler("Please verify your email first", 403));
    }

    // 5. Attach user to request object
    req.user = user;
    next();
  } catch (error) {
    // Clear invalid token cookie
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    if (error.name === "JsonWebTokenError") {
      return next(new ErrorHandler("Invalid token. Please login again", 401));
    }
    if (error.name === "TokenExpiredError") {
      return next(new ErrorHandler("Session expired. Please login again", 401));
    }
    return next(new ErrorHandler("Authentication failed", 500));
  }
});

export const logoutUser = catchAsyncErrors(async (req, res, next) => {
  // Clear the token cookie
  res.clearCookie("token", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  });

  res.status(200).json({
    success: true,
    message: "Logged out successfully",
  });
});

export const isAuthorized = (...roles) => {
  return (req, res, next) => {
    if (!req.user) {
      return next(new ErrorHandler("User not authenticated", 401));
    }

    if (!roles.includes(req.user.role)) {
      return next(
        new ErrorHandler(
          `User with role (${req.user.role}) is not authorized to access this resource`,
          403
        )
      );
    }
    next();
  };
};
