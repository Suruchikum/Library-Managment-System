// import React, { useEffect } from "react";
// import { useDispatch, useSelector } from "react-redux";
// import {
//   toggleAddNewAdminPopup,
//   toggleReadBookPopup,
//   toggleRecordBookPopup,
//   toggleReturnBookPopup,
//   toggleSettingPopup,
//   toggleAddBookPopup,
// } from "../store/slices/popUpSlice";
// import logo_with_title from "../assets/logo-with-title-black.png";
// import returnIcon from "../assets/redo.png";
// import browseIcon from "../assets/pointing.png";
// import bookIcon from "../assets/book-square.png";
// import { Pie } from "react-chartjs-2";
// import {
//   Chart as ChartJS,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement,
// } from "chart.js";
// import logo from "../assets/black-logo.png";

// ChartJS.register(
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
//   LineElement,
//   PointElement,
//   ArcElement
// );

// const UserDashboard = () => {
//   const dispatch = useDispatch();

//   const {
//     addNewAdminPopup,
//     readBookPopup,
//     recordBookPopup,
//     returnBookPopup,
//     settingPopup,
//     addBookPopup,
//   } = useSelector((state) => state.popups);

//   useEffect(() => {
//     console.log("Popup states:", {
//       addNewAdminPopup,
//       readBookPopup,
//       recordBookPopup,
//       returnBookPopup,
//       settingPopup,
//       addBookPopup,
//     });
//   }, [
//     addNewAdminPopup,
//     readBookPopup,
//     recordBookPopup,
//     returnBookPopup,
//     settingPopup,
//     addBookPopup,
//   ]);

//   return (
//     <>
//       <div className="dashboard">
//         <h1>Admin Dashboard</h1>
//         <div className="button-group">
//           <button onClick={() => dispatch(toggleAddNewAdminPopup())}>
//             Add Admin
//           </button>
//           <button onClick={() => dispatch(toggleReadBookPopup())}>
//             Read Book
//           </button>
//           <button onClick={() => dispatch(toggleRecordBookPopup())}>
//             Record Book
//           </button>
//           <button onClick={() => dispatch(toggleReturnBookPopup())}>
//             Return Book
//           </button>
//           <button onClick={() => dispatch(toggleSettingPopup())}>
//             Settings
//           </button>
//           <button onClick={() => dispatch(toggleAddBookPopup())}>
//             Add Book
//           </button>
//         </div>

//         {addNewAdminPopup && <div>AddNewAdmin Component</div>}
//         {readBookPopup && <div>ReadBook Component</div>}
//         {recordBookPopup && <div>RecordBook Component</div>}
//         {returnBookPopup && <div>ReturnBook Component</div>}
//         {settingPopup && <div>SettingPopup Component</div>}
//         {addBookPopup && <div>AddBook Component</div>}
//       </div>
//     </>
//   );
// };

// export default UserDashboard;
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleAddNewAdminPopup,
  toggleReadBookPopup,
  toggleRecordBookPopup,
  toggleReturnBookPopup,
  toggleSettingPopup,
  toggleAddBookPopup,
} from "../store/slices/popUpSlice";
import logo_with_title from "../assets/logo-with-title-black.png";
import returnIcon from "../assets/redo.png";
import browseIcon from "../assets/pointing.png";
import bookIcon from "../assets/book-square.png";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement,
} from "chart.js";
import logo from "../assets/black-logo.png";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
  LineElement,
  PointElement,
  ArcElement
);

const UserDashboard = () => {
  const dispatch = useDispatch();

  // Add safe default values in case popups is undefined
  const {
    addNewAdminPopup = false,
    readBookPopup = false,
    recordBookPopup = false,
    returnBookPopup = false,
    settingPopup = false,
    addBookPopup = false,
  } = useSelector((state) => state.popups || {});

  useEffect(() => {
    console.log("Popup states:", {
      addNewAdminPopup,
      readBookPopup,
      recordBookPopup,
      returnBookPopup,
      settingPopup,
      addBookPopup,
    });
  }, [
    addNewAdminPopup,
    readBookPopup,
    recordBookPopup,
    returnBookPopup,
    settingPopup,
    addBookPopup,
  ]);

  return (
    <div className="dashboard">
      <h1>Admin Dashboard</h1>
      <div className="button-group">
        <button onClick={() => dispatch(toggleAddNewAdminPopup())}>
          Add Admin
        </button>
        <button onClick={() => dispatch(toggleReadBookPopup())}>
          Read Book
        </button>
        <button onClick={() => dispatch(toggleRecordBookPopup())}>
          Record Book
        </button>
        <button onClick={() => dispatch(toggleReturnBookPopup())}>
          Return Book
        </button>
        <button onClick={() => dispatch(toggleSettingPopup())}>Settings</button>
        <button onClick={() => dispatch(toggleAddBookPopup())}>Add Book</button>
      </div>

      {addNewAdminPopup && <div>AddNewAdmin Component</div>}
      {readBookPopup && <div>ReadBook Component</div>}
      {recordBookPopup && <div>RecordBook Component</div>}
      {returnBookPopup && <div>ReturnBook Component</div>}
      {settingPopup && <div>SettingPopup Component</div>}
      {addBookPopup && <div>AddBook Component</div>}
    </div>
  );
};

export default UserDashboard;
