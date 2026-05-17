import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/Login.css";

const TeacherSignup = () => {

  const [userName, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");

  const navigate = useNavigate();

  // 🔥 REGEX VALIDATIONS
  const usernameRegex = /^[A-Za-z ]+$/; // only letters & space
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

    try {
      const res = await axios.post(
        "https://smart-campus-resource-booking-system.onrender.com/auth/teacher-signup",
        {
          userName: userName,
          email: mail,
          password: pass
        }
      );

      alert("✅ Signup Successful");
      console.log(res.data);

      navigate("/teacher-login");

    } catch (error) {
      alert("❌ Email already exists");
      console.log(error);
    }
  };

  return (
    <div className="student-login-container">

      {/* LEFT SIDE */}
      <div className="left-section">

        <h1>RESOURCE MANAGEMENT SYSTEM</h1>

        <p>
          Create a Teacher account to request lab resources and manage sessions.
        </p>

        <ul>
          <li>Request lab resources</li>
          <li>Select venue and period</li>
          <li>Submit seminar/workshop requests</li>
          <li>Track approval status</li>
        </ul>

      </div>

      {/* RIGHT SIDE */}
      <div className="right-section">

        <form className="login-form" onSubmit={handleSubmit}>

          <h2>Teacher Signup</h2>

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
            <Link to="/teacher-login"> Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default TeacherSignup;