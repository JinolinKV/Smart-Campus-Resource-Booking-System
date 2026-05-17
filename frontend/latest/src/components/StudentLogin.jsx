import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import "../style/Login.css";

const StudentLogin = () => {

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
  "https://smart-campus-resource-booking-system.onrender.com/auth/student-login",
  data
);

      alert("Login Successful");

      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("role", "STUDENT");

      navigate("/dashboard");

    } catch (error) {

      alert("Invalid Email or Password");
      console.log(error);
    }
  };

  return (
    <div className="student-login-container">

      {/* Left Side */}
      <div className="left-section">

        <h1>RESOURCE MANAGEMENT SYSTEM</h1>

        <p>
          Welcome to the student portal.  
          Login to view available  resources and approved schedules.
        </p>

        <ul>
          <li>View lab availability</li>
          <li>Check approved requests</li>
          <li>Monitor lab schedules</li>
        </ul>

      </div>

      {/* Right Side */}
      <div className="right-section">

        <form className="login-form" onSubmit={handleSubmit}>

          <h2>Student Login</h2>

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
            <Link to="/student-signup"> Signup</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default StudentLogin;