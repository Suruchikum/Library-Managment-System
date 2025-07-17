// import { createSlice } from "@reduxjs/toolkit";
// import axios from "axios";
// // import { isAuthenticated } from "../../../../../server/middlewares/authMiddleware";
// // import {
// //   logout,
// //   register,
// // } from "../../../../../server/controllers/authController";
// const authSlice = createSlice({
//   name: "auth",
//   initialState: {
//     loadin: false,
//     error: null,
//     message: null,
//     user: null,
//     isAuthenticated: false,
//   },
//   reducers: {
//     registerRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     registerSuccess(state, action) {
//       state.loading = false;
//       state.message = action.payload.message;
//     },
//     registerFailed(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     loginRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     loginSuccess(state, action) {
//       state.loading = false;
//       state.message = action.payload.message;
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//     },
//     loginFailed(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     logoutRequest(state) {
//       state.loading = true;
//       state.message = null;
//       state.error = null;
//     },
//     logoutSuccess(state, action) {
//       state.loading = false;
//       state.error = action.payload;

//       state.message = null;
//     },
//     getUserRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     getUserSuccess(state, action) {
//       state.loading = false;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//     },
//     getUserFailed(state) {
//       state.loading = false;
//       state.user = null;
//       state.isAuthenticated = false;
//     },
//     forgotPasswordRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     forgotPasswordSuccess(state, action) {
//       state.loading = false;
//       state.message = action.payload;
//     },
//     forgotPasswordFailed(state) {
//       state.loading = false;
//       state.message = action.payload;
//     },
//     resetPasswordRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     resetPasswordSuccess(state, action) {
//       state.loading = false;
//       state.message = action.payload.message;
//       state.user = action.payload.user;
//       state.isAuthenticated = true;
//     },
//     resetPasswordFailed(state) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     updatePasswordRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     updatePasswordSuccess(state, action) {
//       state.loading = false;
//       state.message = action.payload.message;
//     },
//     updatePasswordFailed(state) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//     resetAuthSlice(state) {
//       state.error = null;
//       state.loading = false;
//       state.message = null;
//       state.user = state.user;
//       state.isAuthenticated = state.isAuthenticated;
//     },
//     otpVerificationRequest(state) {
//       state.loading = true;
//       state.error = null;
//       state.message = null;
//     },
//     otpVerificationRequest(state, action) {
//       state.loading = false;

//       state.message = action.payload.message;
//       state.isAuthenticated = true;
//       state.user = action.payload.user;
//     },
//     otpVerificationRequest(state, action) {
//       state.loading = false;
//       state.error = action.payload;
//     },
//   },
// });
// export const resetAuthSlice = () => (dispatch) => {
//   dispatch(authSlice.actions.resetAuthSlice());
// };

// export const register = (data) => async (dispatch) => {
//   dispatch(authSlice.actions.registerRequest());
//   await axios
//     .post("http://localhost:4003/api/v1/auth/register", data, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       dispatch(authSlice.actions.registerSuccess(res.data));
//     })
//     .catch((error) => {
//       dispatch(authSlice.actions.registerFailed(error.response.data.message));
//     });
// };
// export const otpVerification = (data, otp) => async (dispatch) => {
//   dispatch(authSlice.actions.otpVerificationRequest());
//   await axios
//     .post(
//       "http://localhost:4003/api/v1/auth/verify-otp",
//       { email, otp },
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((res) => {
//       dispatch(authSlice.actions.otpVerificationSuccess(res.data));
//     })
//     .catch((error) => {
//       dispatch(
//         authSlice.actions.otpVerificationFailed(error.response.data.message)
//       );
//     });
// };
// export const login = (data) => async (dispatch) => {
//   dispatch(authSlice.actions.loginRequest());
//   await axios
//     .post("http://localhost:4003/api/v1/auth/login", data, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       dispatch(authSlice.actions.loginSuccess(res.data));
//     })
//     .catch((error) => {
//       dispatch(authSlice.actions.loginFailed(error.response.data.message));
//     });
// };
// export const logout = (data) => async (dispatch) => {
//   dispatch(authSlice.actions.logoutRequest());
//   await axios
//     .post("http://localhost:4003/api/v1/auth/logout", data, {
//       withCredentials: true,
//     })
//     .then((res) => {
//       dispatch(authSlice.actions.logoutSuccess(res.data.message));
//       dispatch(authSlice.actions.resetAuthSlice());
//     })
//     .catch((error) => {
//       dispatch(authSlice.actions.logoutFailed(error.response.data.message));
//     });
// };
// export const getUser = (data) => async (dispatch) => {
//   dispatch(authSlice.actions.getUserRequest());
//   await axios
//     .get("http://localhost:4003/api/v1/auth/me", data, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       dispatch(authSlice.actions.getUserSuccess(res.data));
//     })
//     .catch((error) => {
//       dispatch(authSlice.actions.getUserFailed(error.response.data.message));
//     });
// };
// export const forgotPassword = (email) => async (dispatch) => {
//   dispatch(authSlice.actions.forgotPasswordRequest());
//   await axios
//     .post(
//       "http://localhost:4003/api/v1/auth/password/forgot",
//       { email },
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//     .then((res) => {
//       dispatch(
//         authSlice.actions.forgotPasswordSuccessSuccess(res.data.message)
//       );
//     })
//     .catch((error) => {
//       dispatch(
//         authSlice.actions.forgotPasswordFailed(error.response.data.message)
//       );
//     });
// };
// export const resetPassword = (data, token) => async (dispatch) => {
//   dispatch(authSlice.actions.forgotPasswordRequest());
//   await axios
//     .put(`http://localhost:4003/api/v1/auth/password/reset/${token}`, data, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       dispatch(authSlice.actions.resetPasswordSuccessSuccess(res.data.message));
//     })
//     .catch((error) => {
//       dispatch(
//         authSlice.actions.resetPasswordFailed(error.response.data.message)
//       );
//     });
// };
// export const updatePassword = (data, token) => async (dispatch) => {
//   dispatch(authSlice.actions.updatePasswordRequest());
//   await axios
//     .put(`http://localhost:4003/api/v1/auth/password/update`, data, {
//       withCredentials: true,
//       headers: {
//         "Content-Type": "application/json",
//       },
//     })
//     .then((res) => {
//       dispatch(
//         authSlice.actions.updatePasswordSuccessSuccess(res.data.message)
//       );
//     })
//     .catch((error) => {
//       dispatch(
//         authSlice.actions.updatePasswordFailed(error.response.data.message)
//       );
//     });
// };
// export default authSlice.reducer;
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// ===== Initial State =====
const initialState = {
  loading: false,
  error: null,
  message: null,
  user: null,
  isAuthenticated: false,
};

// ===== Slice =====
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    registerRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    registerSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    registerFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    loginRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    loginSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    loginFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    logoutRequest: (state) => {
      state.loading = true;
      state.message = null;
      state.error = null;
    },
    logoutSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
      state.user = null;
      state.isAuthenticated = false;
    },
    logoutFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    getUserRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    getUserSuccess: (state, action) => {
      state.loading = false;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    getUserFailed: (state, action) => {
      state.loading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.error = action.payload;
    },

    forgotPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    forgotPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload;
    },
    forgotPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetPasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    resetPasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
    resetPasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    updatePasswordRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updatePasswordSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
    },
    updatePasswordFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    otpVerificationRequest: (state) => {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    otpVerificationSuccess: (state, action) => {
      state.loading = false;
      state.message = action.payload.message;
      state.isAuthenticated = true;
      state.user = action.payload.user;
    },
    otpVerificationFailed: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },

    resetAuthSlice: (state) => {
      state.loading = false;
      state.error = null;
      state.message = null;
    },
  },
});

export const {
  registerRequest,
  registerSuccess,
  registerFailed,
  loginRequest,
  loginSuccess,
  loginFailed,
  logoutRequest,
  logoutSuccess,
  logoutFailed,
  getUserRequest,
  getUserSuccess,
  getUserFailed,
  forgotPasswordRequest,
  forgotPasswordSuccess,
  forgotPasswordFailed,
  resetPasswordRequest,
  resetPasswordSuccess,
  resetPasswordFailed,
  updatePasswordRequest,
  updatePasswordSuccess,
  updatePasswordFailed,
  otpVerificationRequest,
  otpVerificationSuccess,
  otpVerificationFailed,
  resetAuthSlice: resetAuth,
} = authSlice.actions;

// ========== Thunks (Async Functions) ==========

export const register = (data) => async (dispatch) => {
  dispatch(registerRequest());
  try {
    const res = await axios.post(
      "http://localhost:4003/api/v1/auth/register",
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(registerSuccess(res.data));
  } catch (error) {
    dispatch(
      registerFailed(error.response?.data?.message || "Registration failed")
    );
  }
};

export const otpVerification = (email, otp) => async (dispatch) => {
  dispatch(otpVerificationRequest());
  try {
    const res = await axios.post(
      "http://localhost:4003/api/v1/auth/otp-verification",
      { email, otp },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(otpVerificationSuccess(res.data));
  } catch (error) {
    dispatch(
      otpVerificationFailed(error.response?.data?.message || "Invalid OTP")
    );
  }
};

// export const login = (credentials) => async (dispatch) => {
//   dispatch(loginRequest());
//   try {
//     const res = await axios.post(
//       "http://localhost:4003/api/v1/auth/login",
//       credentials, // Changed from {email, password} to credentials
//       {
//         withCredentials: true,
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     );

//     // Ensure response contains required data
//     if (res.data && res.data.user) {
//       dispatch(
//         loginSuccess({
//           user: res.data.user,
//           message: res.data.message || "Login successful",
//         })
//       );
//     } else {
//       throw new Error("Invalid response from server");
//     }
//   } catch (error) {
//     const errorMessage =
//       error.response?.data?.message ||
//       error.response?.data?.error ||
//       error.message ||
//       "Login failed";
//     dispatch(loginFailed(errorMessage));
//   }
// };
export const login = (credentials) => async (dispatch) => {
  dispatch(loginRequest());
  try {
    const { data } = await axios.post(
      "http://localhost:4003/api/v1/auth/login",
      credentials,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    dispatch(
      loginSuccess({
        user: data.user,
        message: data.message || "Login successful",
      })
    );
    return { payload: data, meta: { requestStatus: "fulfilled" } };
  } catch (error) {
    const errorMessage =
      error.response?.data?.message ||
      error.response?.data?.error ||
      error.message ||
      "Login failed";
    dispatch(loginFailed(errorMessage));
    return { error: errorMessage, meta: { requestStatus: "rejected" } };
  }
};
export const logout = () => async (dispatch) => {
  dispatch(logoutRequest());
  try {
    const res = await axios.post(
      "http://localhost:4003/api/v1/auth/logout",
      null,
      { withCredentials: true }
    );
    dispatch(logoutSuccess(res.data.message));
    dispatch(resetAuth());
  } catch (error) {
    dispatch(logoutFailed(error.response?.data?.message || "Logout failed"));
  }
};

export const getUser = () => async (dispatch) => {
  dispatch(getUserRequest());
  try {
    const res = await axios.get("http://localhost:4003/api/v1/auth/getUser", {
      withCredentials: true,
    });
    dispatch(getUserSuccess(res.data));
  } catch (error) {
    dispatch(getUserFailed(error.response?.data?.message || "Get user failed"));
  }
};

export const forgotPassword = (email) => async (dispatch) => {
  dispatch(forgotPasswordRequest());
  try {
    const res = await axios.post(
      "http://localhost:4003/api/v1/auth/password/forgot",
      { email },
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(forgotPasswordSuccess(res.data.message));
  } catch (error) {
    dispatch(
      forgotPasswordFailed(
        error.response?.data?.message || "Failed to send email"
      )
    );
  }
};

export const resetPassword = (data, token) => async (dispatch) => {
  dispatch(resetPasswordRequest());
  try {
    const res = await axios.put(
      `http://localhost:4003/api/v1/auth/password/reset/${token}`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(resetPasswordSuccess(res.data));
  } catch (error) {
    dispatch(
      resetPasswordFailed(
        error.response?.data?.message || "Password reset failed"
      )
    );
  }
};

export const updatePassword = (data) => async (dispatch) => {
  dispatch(updatePasswordRequest());
  try {
    const res = await axios.put(
      `http://localhost:4003/api/v1/auth/password/update`,
      data,
      {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    dispatch(updatePasswordSuccess(res.data));
  } catch (error) {
    dispatch(
      updatePasswordFailed(
        error.response?.data?.message || "Password update failed"
      )
    );
  }
};

export const resetAuthSlice = () => (dispatch) => {
  dispatch(authSlice.actions.resetAuthSlice());
};

export default authSlice.reducer;
