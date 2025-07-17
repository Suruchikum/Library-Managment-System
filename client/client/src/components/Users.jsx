import React from "react";
import { useSelector } from "react-redux";
const Users = () => {
  const { users } = useSelector((state) => state.user);
  const formatDate = (timeStamp) => {
    console.log(typeof timeStamp);
    const date = new Date(timeStamp);
    console.log(typeof date);
  };
  formatDate("2025-07-16T10:08:11.251+00:00");
  return <>user</>;
};

export default Users;
