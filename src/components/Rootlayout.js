import React from "react";
import { Outlet } from "react-router-dom";
import Header from "./Header";

function RootLayout() {
  return (
    <div>
      <div>
        <Header />
      </div>
      <div style={{ minHeight: "80vh" }} className="container mt-5">
        <Outlet />
      </div>
    </div>
  );
}

export default RootLayout;
