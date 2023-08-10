import React from "react";
import { NavLink } from "react-router-dom";
import "./navbar.css";
const Navbar = () => {
  return (
    <>
      <ul className="nav-menu">
        <li className="nav-item">
          <NavLink exact to="/" className="nav-links">
            Home
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/createuser" className="nav-links">
            Create User
          </NavLink>
        </li>
        <li className="nav-item">
          <NavLink exact to="/getallusers" className="nav-links">
            Modify Users
          </NavLink>
        </li>
      </ul>
    </>
  );
};

export default Navbar;
