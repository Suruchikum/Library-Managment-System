import React, { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";
import SideBar from "../layout/SideBar";
import UserDashboard from "../components/UserDashboard";
import AdminDashboard from "../components/AdminDashboard";
import BookManagement from "../components/BookManagement";
import Catalog from "../components/Catalog"; // ✅ Ensure all these exist
import Users from "../components/Users";
import MyBorrowedBooks from "../components/MyBorrowedBooks";
// import AppLayout from "../layout/AppLayout";
const Home = () => {
  const [isSideBarOpen, setSideBarOpen] = useState(false);
  const [selectedComponent, setSelectedComponent] = useState("Dashboard");

  const { user, isAuthenticated } = useSelector((state) => state.auth);

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Function to render the selected component
  const renderComponent = () => {
    switch (selectedComponent) {
      case "Dashboard":
        return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
      case "Books":
        return <BookManagement />;
      case "Catalog":
        return user?.role === "Admin" ? <Catalog /> : null;
      case "Users":
        return user?.role === "Admin" ? <Users /> : null;
      case "My Borrowed Books":
        return <MyBorrowedBooks />;
      default:
        return user?.role === "User" ? <UserDashboard /> : <AdminDashboard />;
        break;
    }
  };

  return (
    <>
      <div className="relative md:pl-64 flex min-h-screen bg-gray-100">
        <div className="md:hidden z-10 absolute right-6 top-4 sm:top-6 flex justify-center items-center bg-black rounded-md h-9 w-9 text-white">
          <GiHamburgerMenu
            className="text-2xl"
            onClick={() => setSideBarOpen(!isSideBarOpen)}
          />
        </div>
        <SideBar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setSideBarOpen}
          setSelectedComponent={setSelectedComponent} // ✅ setter passed here
        />
        <div>
          {/* <AppLayout>
            
            <p>Welcome to the Bookworm Dashboard</p>
          </AppLayout> */}
        </div>
        <div className="w-full p-4">{renderComponent()}</div>
      </div>
    </>
  );
};

export default Home;
