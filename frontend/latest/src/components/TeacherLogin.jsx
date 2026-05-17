import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.css"; // reuse same split layout CSS

const TeacherLogin = () => {

  const [userName, setName] = useState("");
  const [pass, setPass] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {

      const res = await axios.post(
        "https://smart-campus-resource-booking-system.onrender.com/auth/teacher-login",
        {
          email: userName,
          password: pass
        }
      );

      alert("Login Successful");

      console.log(res.data);

      // store user
      localStorage.setItem("user", JSON.stringify(res.data));
      localStorage.setItem("role", "TEACHER");

      navigate("/teacher-request");

    } catch (error) {

      alert("Invalid Credentials");
      console.log(error);
    }
  };

  return (
    <div className="student-login-container">

      {/* LEFT SIDE */}
      <div className="left-section">

        <h1>RESOURCE MANAGEMENT SYSTEM</h1>

        <p>
          Welcome to Teacher Portal.
          Login to request lab resources and manage class schedules.
        </p>

        <ul>
          <li>Request resources</li>
          <li>Choose venue and period</li>
          <li>Submit workshop/seminar requests</li>
          <li>Track approval status</li>
        </ul>

      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">

        <form className="login-form" onSubmit={handleSubmit}>

          <h2>Teacher Login</h2>

          <label>Email</label>
          <input
            type="email"
            value={userName}
            onChange={(e) => setName(e.target.value)}
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
            <Link to="/teacher-signup"> Signup</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default TeacherLogin;