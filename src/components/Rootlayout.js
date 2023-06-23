import React from "react";
import { Outlet, useLocation } from "react-router-dom";
import { useState } from "react";
import Dashboard from "./Dashboard";

function RootLayout() {
  //use location
  const location = useLocation();

  // Check if the current location is the noteslist page
  const isNotesList = location.pathname === "/get-all-notes";

  // Check if the current location is the login page
  const isLoginPage = location.pathname === "/login";

  // Check if the current location is the register page
  const isRegisterPage = location.pathname === "/register";

  return (
    <div>
      <div className="container">
        <div style={{ minHeight: "80vh" }}>
          {!isLoginPage && !isRegisterPage && <Dashboard />}
          {isNotesList ? <Outlet /> : <Outlet />}
        </div>
      </div>
    </div>
  );
}

export default RootLayout;
