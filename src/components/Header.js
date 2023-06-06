import React from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

function Header() {
  let { status } = useSelector((state) => state.user);
  let dispatch = useDispatch();

  return (
    <div className="p-2 bg-dark text-white">
      <ul className="nav justify-content-end">
        {/* link for registration  */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/register"
          >
            Register
          </NavLink>
        </li>
        {/* link for login  */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/login"
          >
            Login
          </NavLink>
        </li>
        {/* link for contactUs  */}
        <li className="nav-item">
          <NavLink
            className={({ isActive }) =>
              isActive ? "active nav-link" : "inactive nav-link"
            }
            to="/contact-us"
          >
            ContactUs
          </NavLink>
        </li>
      </ul>
    </div>
  );
}

export default Header;
