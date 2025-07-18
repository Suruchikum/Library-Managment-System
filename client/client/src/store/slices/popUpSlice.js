// import { createSlice } from "@reduxjs/toolkit";

// const popupSlice = createSlice({
//   name: "popup",
//   initialState: {
//     settingPopup: false,
//     addBookPopup: false,
//     readBookPopup: false,
//     recordBookPopup: false,
//     returnBookPopup: false,
//     addNewAdminPopup: false,
//   },
//   reducers: {
//     toggleSettingPopup(state) {
//       state.settingPopup = !state.settingPopup;
//     },
//     toggleAddBookPopup(state) {
//       state.addBookPopup = !state.addBookPopup;
//     },
//     toggleReadBookPopup(state) {
//       state.readBookPopup = !state.readBookPopup;
//     },
//     toggleRecordBookPopup(state) {
//       state.recordBookPopup = !state.recordBookPopup;
//     },
//     toggleReturnBookPopup(state) {
//       state.returnBookPopup = !state.returnBookPopup; // ✅ fixed: previously wrong assignment
//     },
//     toggleAddNewAdminPopup(state) {
//       state.addNewAdminPopup = !state.addNewAdminPopup;
//     },
//     closeAllPopup(state) {
//       state.settingPopup = false;
//       state.addBookPopup = false;
//       state.readBookPopup = false;
//       state.recordBookPopup = false;
//       state.returnBookPopup = false;
//       state.addNewAdminPopup = false;
//     },
//   },
// });

// export const {
//   toggleSettingPopup,
//   toggleAddBookPopup,
//   toggleReadBookPopup,
//   toggleRecordBookPopup,
//   toggleReturnBookPopup,
//   toggleAddNewAdminPopup,
//   closeAllPopup,
// } = popupSlice.actions;

// export default popupSlice.reducer;
// popupSlice.js
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  addNewAdminPopup: false,
  readBookPopup: false,
  recordBookPopup: false,
  returnBookPopup: false,
  settingPopup: false,
  addBookPopup: false,
};

const popupSlice = createSlice({
  name: "popups",
  initialState,
  reducers: {
    toggleAddNewAdminPopup: (state) => {
      state.addNewAdminPopup = !state.addNewAdminPopup;
    },
    toggleReadBookPopup: (state) => {
      state.readBookPopup = !state.readBookPopup;
    },
    toggleRecordBookPopup: (state) => {
      state.recordBookPopup = !state.recordBookPopup;
    },
    toggleReturnBookPopup: (state) => {
      state.returnBookPopup = !state.returnBookPopup;
    },
    toggleSettingPopup: (state) => {
      state.settingPopup = !state.settingPopup;
    },
    toggleAddBookPopup: (state) => {
      state.addBookPopup = !state.addBookPopup;
    },
  },
});

export const {
  toggleAddNewAdminPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleReturnBookPopup,
  toggleSettingPopup,
  toggleAddBookPopup,
} = popupSlice.actions;

export default popupSlice.reducer;
