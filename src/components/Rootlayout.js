import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Dashboard";

function RootLayout() {
  
  // use location
  const location = useLocation();

  // set a state for darkMode
  const [darkMode, setDarkMode] = useState(false);

  // Check if the current location is the noteslist page
  const isNotesList = location.pathname === "/get-all-notes";

  // Check if the current location is the login page
  const isLoginPage = location.pathname === "/login";

  // Check if the current location is the register page
  const isRegisterPage = location.pathname === "/register";

  // toggle mode function
  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  return (
    <div
      className={`${
        darkMode && !isLoginPage && !isRegisterPage ? "dark-mode" : ""
      }`}
    >
      <div className="container">
        <div style={{ minHeight: "80vh" }}>
          {!isLoginPage && !isRegisterPage && (
            <Dashboard toggleDarkMode={toggleDarkMode} darkMode={darkMode} />
          )}
          {isNotesList ? (
            <Outlet toggleDarkMode={toggleDarkMode} />
          ) : (
            <Outlet />
          )}
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
