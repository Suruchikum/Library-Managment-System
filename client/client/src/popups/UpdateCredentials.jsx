// import React from 'react'
// import closeIcon from "../assets/close-square.png";

// const SettingPopup = () => {
//   return (
//     <div>

//     </div>
//   )
// }

// export default SettingPopup
// 📁 /popups/UpdateCredentials.jsx
import React from "react";

const UpdateCredentials = () => {
  return (
    <div className="p-6 bg-white shadow-lg rounded-lg w-[400px]">
      <h2 className="text-xl font-semibold mb-4">Update Credentials</h2>
      <form>
        <input
          type="password"
          placeholder="Current Password"
          className="w-full p-2 border mb-3 rounded"
        />
        <input
          type="password"
          placeholder="New Password"
          className="w-full p-2 border mb-3 rounded"
        />
        <button type="submit" className="bg-black text-white py-2 px-4 rounded">
          Update
        </button>
      </form>
    </div>
  );
};

export default UpdateCredentials;
