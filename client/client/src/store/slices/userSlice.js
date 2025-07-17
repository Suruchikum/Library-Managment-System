import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { toast } from "react-toastify";

const initialState = {
  users: [],
  loading: false,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    startLoading(state) {
      state.loading = true;
      state.error = null;
    },
    fetchAllUsersSuccess(state, action) {
      state.loading = false;
      state.users = action.payload;
    },
    addNewAdminSuccess(state) {
      state.loading = false;
    },
    operationFailed(state, action) {
      state.loading = false;
      state.error = action.payload;
    },
    resetError(state) {
      state.error = null;
    },
  },
});

// Thunk Actions
export const fetchAllUsers = () => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await axios.get("http://localhost:4003/api/user/all", {
      withCredentials: true,
    });
    dispatch(fetchAllUsersSuccess(data.users));
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Failed to fetch users";
    dispatch(operationFailed(errorMsg));
    toast.error(errorMsg);
  }
};

export const addNewAdmin = (formData) => async (dispatch) => {
  try {
    dispatch(startLoading());
    const { data } = await axios.post(
      "http://localhost:4003/api/user/add/new-admin",
      formData,
      {
        headers: {
          "Content-Type": "multipart/form-data",
        },
        withCredentials: true,
      }
    );
    dispatch(addNewAdminSuccess());
    toast.success(data.message);
    return data; // Return response data for potential chaining
  } catch (err) {
    const errorMsg = err.response?.data?.message || "Failed to add admin";
    dispatch(operationFailed(errorMsg));
    toast.error(errorMsg);
    throw errorMsg; // Throw error for handling in components
  }
};

export const {
  startLoading,
  fetchAllUsersSuccess,
  addNewAdminSuccess,
  operationFailed,
  resetError,
} = userSlice.actions;

export default userSlice.reducer;
