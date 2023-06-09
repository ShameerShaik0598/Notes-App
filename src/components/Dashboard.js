import React from "react";
import Search from "./Search";
import { useDispatch } from "react-redux";
import { clearState } from "../userLoginSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ toggleDarkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  //logout function
  const handleLogout = () => {
    let actionObj = clearState();
    dispatch(actionObj);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div>
      <div className="header mb-3">
        <h1 className=" display-5 ms-3">Notes</h1>
        <button onClick={toggleDarkMode} className="save">
          Toggle Dark
        </button>
        <button onClick={handleLogout} className="save me-3">
          Logout
        </button>
      </div>
      {/* <Search /> */}
    </div>
  );
};

export default Dashboard;
