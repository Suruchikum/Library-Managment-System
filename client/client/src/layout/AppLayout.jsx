// layout/AppLayout.jsx
// import React, { useState } from "react";
// import SideBar from "./SideBar";

// const AppLayout = ({ children }) => {
//   const [isSideBarOpen, setIsSideBarOpen] = useState(true);
//   const [selectedComponent, setSelectedComponent] = useState("Dashboard");

//   return (
//     <div className="flex h-screen">
//       <SideBar
//         isSideBarOpen={isSideBarOpen}
//         setIsSideBarOpen={setIsSideBarOpen}
//         setSelectedComponent={setSelectedComponent}
//       />
//       <main className="flex-1 overflow-y-auto bg-gray-100">
//         <div className="p-4">
//           <h1 className="text-2xl font-bold">{selectedComponent}</h1>
//           {children}
//         </div>
//       </main>
//     </div>
//   );
// };

// export default AppLayout;
