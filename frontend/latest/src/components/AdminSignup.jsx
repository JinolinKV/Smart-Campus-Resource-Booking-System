import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.css";

const AdminSignup = () => {

  const [userName, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");

  const navigate = useNavigate();

  // 🔥 REGEX VALIDATIONS
  const usernameRegex = /^[A-Za-z ]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ USERNAME VALIDATION
    if (!usernameRegex.test(userName)) {
      alert("❌ Username should contain only letters (no numbers or symbols)");
      return;
    }

    // ✅ PASSWORD VALIDATION
    if (!passwordRegex.test(pass)) {
      alert(
        "❌ Password must contain:\n\n" +
        "• At least 8 characters\n" +
        "• One uppercase letter\n" +
        "• One lowercase letter\n" +
        "• One number\n" +
        "• One special symbol (@$!%*?&)"
      );
      return;
    }

    const data = {
      name: userName,
      email: mail,
      password: pass,
      role: "ADMIN",
    };

    try {

      const res = await axios.post(
        "https://smart-campus-resource-booking-system.onrender.com/auth/admin-signup",
        data
      );
      alert("✅ Admin Registered Successfully");
      console.log(res.data);

      navigate("/admin-login");

    } catch (error) {

      console.log(error);
      alert("❌ Signup Failed or Email already exists");
    }
  };

  return (
    <div className="student-login-container">

      {/* LEFT SIDE */}
      <div className="left-section">

        <h1>LAB MANAGEMENT SYSTEM</h1>

        <p>
          Create an Admin account to manage lab resources and approvals.
        </p>

        <ul>
          <li>Approve teacher requests</li>
          <li>Reject invalid requests</li>
          <li>Manage lab schedules</li>
          <li>Monitor lab usage</li>
        </ul>

      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">

        <form className="login-form" onSubmit={handleSubmit}>

          <h2>Admin Signup</h2>

          {/* USERNAME */}
          <label>Username</label>
          <input
            type="text"
            value={userName}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter username"
            required
          />

          {/* EMAIL */}
          <label>Email</label>
          <input
            type="email"
            value={mail}
            onChange={(e) => setMail(e.target.value)}
            placeholder="Enter email"
            required
          />

          {/* PASSWORD */}
          <label>Password</label>
          <input
            type="password"
            value={pass}
            onChange={(e) => setPass(e.target.value)}
            placeholder="Enter password"
            required
          />

          {/* 🔥 PASSWORD HINT */}
          <small style={{ color: "gray", fontSize: "12px" }}>
            Password must contain uppercase, lowercase, number, symbol & min 8 characters
          </small>

          <button type="submit">Signup</button>

          <p className="signup-link">
            Already have an account?
            <Link to="/admin-login"> Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default AdminSignup;