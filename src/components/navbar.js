import React from 'react'
import { NavLink } from 'react-router-dom'
import './navbar.css';
function Navbar() {
    return (
        <>
            <nav className="navbar">
                <div className="nav-container">
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
                                Get all users
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/getuser" className="nav-links">
                                Get User
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/deleteuser" className="nav-links">
                                Delete User
                            </NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink exact to="/updateuser" className="nav-links">
                                Update User
                            </NavLink>
                        </li>
                    </ul>

                </div>

            </nav>
        </>
    );
}

export default Navbar;