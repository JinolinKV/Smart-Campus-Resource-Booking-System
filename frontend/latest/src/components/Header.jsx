import React from "react";
import "../style/Header.css";
import { Link, useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  // check login
  const user = localStorage.getItem("user");
  const role = localStorage.getItem("role");

  const handleLogout = () => {

    localStorage.removeItem("user");
    localStorage.removeItem("role");

    navigate("/");
  };

  return (
    <div className="header">

      <div className="logo">
        <h1>RESOURCE MANAGEMENT</h1>
      </div>

      <div className="nav">
        <ul>

          {/* Home always visible */}
          <Link to="/">
            <li>Home</li>
          </Link>

          {/* Show Dashboard only if logged in */}
          {user && (
            <Link to="/dashboard">
              <li>Dashboard</li>
            </Link>
          )}

          {/* Show Logout only if logged in */}
          {user && (
            <li className="logout" onClick={handleLogout}>
              Logout
            </li>
          )}

        </ul>
      </div>

    </div>
  );
};

export default Header;