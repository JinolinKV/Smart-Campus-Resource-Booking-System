import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import "../style/Signup.css";

const StudentSignup = () => {
  const [userName, setName] = useState("");
  const [pass, setPass] = useState("");
  const [mail, setMail] = useState("");

  const navigate = useNavigate();

  // 🔥 REGEX VALIDATION
  const usernameRegex = /^[A-Za-z ]+$/;
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // ✅ USERNAME CHECK
    if (!usernameRegex.test(userName)) {
      alert("❌ Username should contain only letters (no numbers or symbols)");
      return;
    }

    // ✅ PASSWORD CHECK
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
      role: "STUDENT",
    };

    try {
      const res = await axios.post(
        "http://localhost:8080/auth/student-signup",
        data
      );

      alert("✅ Student Registered Successfully");
      console.log(res.data);

      navigate("/student-login");

    } catch (error) {
      console.log(error);
      alert("❌ Signup Failed or Email already exists");
    }
  };

  return (
    <div className="signup-container">

      {/* Left Side */}
      <div className="signup-left">

        <h1>RESOURCE MANAGEMENT</h1>

        <p>
          Manage resources, schedules and approvals efficiently.
        </p>

        <ul>
          <li>✔ View lab availability</li>
          <li>✔ Check approved schedules</li>
          <li>✔ Easy resource management</li>
          <li>✔ Real-time updates</li>
        </ul>

      </div>

      {/* Right Side */}
      <div className="signup-right">

        <form className="signup-form" onSubmit={handleSubmit}>

          <h2>Student Signup</h2>

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

          <p className="login-link">
            Already have an account?
            <Link to="/student-login"> Login</Link>
          </p>

        </form>

      </div>

    </div>
  );
};

export default StudentSignup;