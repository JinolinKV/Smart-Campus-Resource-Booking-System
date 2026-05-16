import React from "react";
import { Link } from "react-router-dom";
import "../style/Main.css";

const Login = () => {
  return (
    <div className="login-container">

      <h2 className="title">Resource Management System</h2>
      <p className="subtitle">
        Select your role to access the system
      </p>

      <div className="login-box">

        {/* Admin */}
        <div className="card admin-card">
          <div className="icon">🛠️</div>
          <h3>Admin</h3>

          <p>
            Manage resources, approve teacher requests,
            and monitor system activities.
          </p>

          <Link to="/admin-login">
            <button className="login-btn">Login as Admin</button>
          </Link>
        </div>

        {/* Teacher */}
        <div className="card teacher-card">
          <div className="icon">👨‍🏫</div>
          <h3>Teacher</h3>

          <p>
            Request  resources, select class and venue,
            and manage lab sessions.
          </p>

          <Link to="/teacher-login">
            <button className="login-btn">Login as Teacher</button>
          </Link>
        </div>

        {/* Student */}
        <div className="card student-card">
          <div className="icon">👨‍🎓</div>
          <h3>Student</h3>

          <p>
            View resource schedules and check available
            resources assigned by teachers.
          </p>

          <Link to="/student-login">
            <button className="login-btn">Login as Student</button>
          </Link>
        </div>

      </div>

    </div>
  );
};

export default Login;