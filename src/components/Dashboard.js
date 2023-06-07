import React from "react";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { clearState } from "../userLoginSlice";
import { useNavigate } from "react-router-dom";
import { RiLogoutCircleRFill } from "react-icons/ri";
// import { BsToggleOn } from "react-icons/bs";

const Dashboard = ({ toggleDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    let actionObj = clearState();
    dispatch(actionObj);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div className="header">
        <h1>Notes</h1>
        <button onClick={toggleDarkMode}>Toggle Dark</button>
        <button onClick={handleLogout}>Logout</button>
      </div>
      <Search />
    </div>
  );
};

export default Dashboard;
