import crypto from "crypto";

import { catchAsyncErrors } from "../middlewares/catchAsyncErrors.js";
import ErrorHandler from "../middlewares/errorMiddleware.js";
import { User } from "../models/userModel.js";
import bcrypt from "bcrypt";

import { sendVerificationCode } from "../utils/sendVerificationCode.js";
import { sendToken } from "../utils/sendToken.js";
import { sendEmail } from "../utils/sendEmail.js";
import { generateForgotPasswordEmailTemplate } from "../utils/emailTemplates.js";
export const register = catchAsyncErrors(async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate input fields
  if (!name || !email || !password) {
    return next(new ErrorHandler("Please enter all fields.", 400));
  }

  // Check if user already exists (verified or unverified)
  const existingUser = await User.findOne({ email });

  if (existingUser) {
    if (existingUser.accountVerified) {
      return next(
        new ErrorHandler("User already exists with this email.", 400)
      );
    }

    // For unverified accounts, check registration attempts
    const registrationAttemptsByUser = await User.find({
      email,
      accountVerified: false,
    });

    if (registrationAttemptsByUser.length >= 5) {
      return next(
        new ErrorHandler(
          "You have exceeded the number of registration attempts. Please contact support.",
          400
        )
      );
    }
  }

  // Validate password length
  if (password.length < 8 || password.length > 16) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400)
    );
  }

  // Hash password
  const hashedPassword = await bcrypt.hash(password, 10);

  // Create user
  const user = await User.create({
    name,
    email,
    password: hashedPassword,
  });

  // Generate and send verification code
  const verificationCode = await user.generateVerificationCode();
  await user.save();

  await sendVerificationCode(verificationCode, email, res);
});

// verifyOTP remains the same as your existing code
export const verifyOTP = catchAsyncErrors(async (req, res, next) => {
  const { email, otp } = req.body;

  if (!email || !otp) {
    return next(new ErrorHandler("Email or OTP is missing.", 400));
  }

  try {
    const userAllEntries = await User.find({
      email,
      accountVerified: false,
    }).sort({ createdAt: -1 });

    if (!userAllEntries || userAllEntries.length === 0) {
      return next(new ErrorHandler("User not found.", 404));
    }
    let user = userAllEntries[0];

    // Clean up duplicate unverified accounts
    if (userAllEntries.length > 1) {
      await User.deleteMany({
        _id: { $ne: user._id },
        email,
        accountVerified: false,
      });
    }

    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid OTP.", 400));
    }

    if (Date.now() > new Date(user.verificationCodeExpire).getTime()) {
      return next(new ErrorHandler("OTP expired.", 400));
    }

    user.accountVerified = true;
    user.verificationCode = undefined;
    user.verificationCodeExpire = undefined;
    await user.save({ validateModifiedOnly: true });

    sendToken(user, 200, "Account verified successfully.", res);
  } catch (error) {
    console.error("Error in verifyOTP:", error);
    return next(new ErrorHandler(error.message, 500));
  }
});
// export const login = catchAsyncErrors(async (req, res, next) => {
//   const { email, password } = req.body;

//   if (!email || !password) {
//     return next(new ErrorHandler("Please enter all fields.", 400));
//   }

//   const user = await User.findOne({ email, accountVerified: true })
//     .select("+password")
//     .catch((err) => {
//       console.error("Database error:", err);
//       return next(new ErrorHandler("Server error", 500));
//     });

//   if (!user) {
//     return next(new ErrorHandler("Invalid email or password.", 400));
//   }

//   const isPasswordMatched = await bcrypt.compare(password, user.password);

//   if (!isPasswordMatched) {
//     return next(new ErrorHandler("Invalid email or password.", 400));
//   }

//   // Send proper response with user data
//   const token = user.getJWTToken();
//   const options = {
//     expires: new Date(
//       Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
//     ),
//     httpOnly: true,
//   };

//   res
//     .status(200)
//     .cookie("token", token, options)
//     .json({
//       success: true,
//       message: "Login successful",
//       user: {
//         _id: user._id,
//         name: user.name,
//         email: user.email,
//         role: user.role,
//       },
//     });
// });
// export const logout = catchAsyncErrors(async (req, res, next) => {
//   res
//     .status(200)
//     .cookie("token", "", {
//       expires: new Date(Date.now()),
//       httpOnly: true,
//     })
//     .json({
//       success: true,
//       message: "Logged out successfully.",
//     });
// });
export const login = catchAsyncErrors(async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return next(new ErrorHandler("Please enter all fields.", 400));
  }

  const user = await User.findOne({ email, accountVerified: true })
    .select("+password")
    .catch((err) => {
      console.error("Database error:", err);
      return next(new ErrorHandler("Server error", 500));
    });

  if (!user) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  const isPasswordMatched = await bcrypt.compare(password, user.password);

  if (!isPasswordMatched) {
    return next(new ErrorHandler("Invalid email or password.", 401));
  }

  const token = user.getJWTToken();
  const options = {
    expires: new Date(
      Date.now() + process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "strict",
  };

  res
    .status(200)
    .cookie("token", token, options)
    .json({
      success: true,
      message: "Login successful",
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
      token, // Include token in response if needed for frontend
    });
});
export const getUser = catchAsyncErrors(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({
    success: true,
  });
});
export const logout = catchAsyncErrors(async (req, res, next) => {
  // Clear the token cookie
  res
    .status(200)
    .cookie("token", "", {
      expires: new Date(Date.now()),
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    })
    .json({
      success: true,
      message: "Logged out successfully.",
    });
});
export const forgotPassword = catchAsyncErrors(async (req, res, next) => {
  if (!req.body.email) {
    return next(new ErrorHandler("Email is required.", 400));
  }
  const user = await User.findOne({
    email: req.body.email,
    accountVerified: true,
  });
  if (!user) {
    return next(new ErrorHandler("Invalid email.", 400));
  }
  const resetToken = user.getResetPasswordToken();
  await user.save({ validateBeforeSave: false });
  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = generateForgotPasswordEmailTemplate(resetPasswordUrl);
  console.log("working till here ");
  console.log(user.email);
  console.log(message);
  try {
    await sendEmail({
      email: user.email,
      subject: "Bookworm library management system password recovery",
      message,
    });
    res.status(200).json({
      success: true,
      message: `Email sent to ${user.email} successfully.`,
    });
  } catch (error) {
    console.log(error);
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    return next(new ErrorHandler(error.message, 500));
  }
});
export const resetPassword = catchAsyncErrors(async (req, res, next) => {
  const { token } = req.params;
  const resetPasswordToken = crypto
    .createHash("sha256")
    .update(token)
    .digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });
  if (!user) {
    return next(
      new ErrorHandler(
        "Reset password token is invalid or ahs been expired. ",
        400
      )
    );
  }
  if (req.body.password !== req.body.confirmPassword) {
    return next(
      new ErrorHandler("Password & confirm password do not match.", 400)
    );
  }
  if (
    req.body.password.length < 8 ||
    req.body.password.length > 16 ||
    req.body.confirmPassword.length < 8 ||
    req.body.confirmPassword.length > 16
  ) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400)
    );
  }
  const hashedPassword = await bcrypt.hash(req.body.password, 10);
  user.password = hashedPassword;
  user.resetPasswordToken = undefined;
  // user.res = undefined;
  await user.save();
  sendToken(user, 200, "password reset successfully .", res);
});
export const updatePassword = catchAsyncErrors(async (req, res, next) => {
  const user = await User.findById(req.user._id).select("+password");
  const { currentPassword, newPassword, confirmNewPassword } = req.body;
  if (!currentPassword || !newPassword || !confirmNewPassword) {
    return next(new ErrorHandler("please enter  all fields.", 400));
  }
  const isPasswordMatched = await bcrypt.compare(
    currentPassword,
    user.password
  );
  if (!isPasswordMatched) {
    return next(new ErrorHandler("current password is incorrect.", 400));
  }
  if (
    req.body.password.length < 8 ||
    req.body.password.length > 16 ||
    req.body.confirmPassword.length < 8 ||
    req.body.confirmPassword.length > 16
  ) {
    return next(
      new ErrorHandler("Password must be between 8 and 16 characters.", 400)
    );
  }
  if (newPassword !== confirmNewPassword) {
    return next(
      new ErrorHandler(
        " New Password and confirm new password do not match.",
        400
      )
    );
  }
  const hashedPassword = await bcrypt.hash(newPassword, 10);
  user.password = hashedPassword;
  await user.save();
  res.status(200).json({
    success: true,
    message: "Password updated.",
  });
});
