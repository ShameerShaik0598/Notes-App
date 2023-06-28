import React from "react";
import { FaMoon } from "react-icons/fa";
import { BsSun } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { clearState } from "../userLoginSlice";
import { useNavigate } from "react-router-dom";

const Dashboard = ({ toggleDarkMode, darkMode }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // logout function
  const handleLogout = () => {
    let actionObj = clearState();
    dispatch(actionObj);
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return (
    <div className="header mb-3 d-flex align-items-center justify-content-between">
      <h1 className="display-5 ms-3 p-2">Notes</h1>
      <div>
        {darkMode ? (
          <BsSun
            onClick={toggleDarkMode}
            style={{
              fontSize: 24,
              marginRight: 10,
              background: "white",
              borderRadius: "8px",
              padding: "3px",
            }}
          />
        ) : (
          <FaMoon
            onClick={toggleDarkMode}
            style={{ fontSize: 24, marginRight: 10 }}
          />
        )}

        <button
          onClick={handleLogout}
          className="me-3"
          style={{
            borderRadius: "20px",
            background: "black",
            color: "white",
            border: "none",
          
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Dashboard;
