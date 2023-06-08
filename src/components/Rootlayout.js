import React from "react";
import { Outlet, useLocation } from "react-router-dom";
// import Header from "./Header";
import { useState } from "react";
import Dashboard from "./Dashboard";

function RootLayout() {
  const location = useLocation();

  const [darkMode, setDarkMode] = useState(false);

  // Check if the current location is the noteslist page
  const isNotesList = location.pathname === "/get-all-notes";
  const isLoginPage = location.pathname === "/login";
  const isRegisterPage = location.pathname === "/register";

  const toggleDarkMode = () => {
    // console.log("rootlayout dark");
    setDarkMode(!darkMode);
  };

  return (
    <div className={`${darkMode ? "dark-mode" : ""}`}>
      <div className="container">
        {/* {!isLoginPage && !isNotesList && <Header />} */}
        <div style={{ minHeight: "80vh" }}>
          {!isLoginPage && !isRegisterPage &&   (
            <Dashboard toggleDarkMode={toggleDarkMode} />
          )}
          <Outlet toggleDarkMode={toggleDarkMode} />
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
