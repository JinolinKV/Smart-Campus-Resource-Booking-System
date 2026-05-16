import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.css"; 
const AdminLogin = () => {

  const [email, setEmail] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const data = {
      email,
      password: pass,
    };

    try {

      const res = await axios.post(
        "http://localhost:8080/auth/admin-login",
        data
      );

      // alert("Admin Login Successful");

      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("role", "ADMIN");

      navigate("/admin-approval");

    } catch (error) {

      // alert("Invalid Credentials");
      console.log(error);
    }
  };

  return (
    <div className="student-login-container">

      {/* LEFT SIDE */}
      <div className="left-section">

        <h1>RESOURCE MANAGEMENT SYSTEM</h1>

        <p>
          Welcome to Admin Portal.  
          Manage lab requests and approve or reject teacher submissions.
        </p>

        <ul>
          <li>Approve lab requests</li>
          <li>Reject invalid requests</li>
          <li>Monitor lab usage</li>
          <li>Manage lab schedule</li>
        </ul>

      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">

        <form className="login-form" onSubmit={handleSubmit}>

          <h2>Admin Login</h2>

          <label>Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter email"
            required
          />

          <label>Password</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter password"
            required
          />

          <button type="submit">Login</button>

          <p className="signup-link">
            Don't have an account?
            <Link to="/admin-signup"> Signup</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default AdminLogin;