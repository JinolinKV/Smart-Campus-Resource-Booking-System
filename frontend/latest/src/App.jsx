import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./components/Login";
import AdminLogin from "./components/AdminLogin";
import AdminSignup from "./components/AdminSignup";
import AdminApproval from "./components/AdminApproval";

import TeacherLogin from "./components/TeacherLogin";
import TeacherSignup from "./components/TeacherSignup";
import TeacherReq from "./components/TeacherReq";

import StudentLogin from "./components/StudentLogin";
import StudentSignup from "./components/StudentSignup";
import StudentView from "./components/StudentView";

import Header from "./components/Header";
import Dashboard from "./components/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import RoleProtectedRoute from "./components/RoleProtectedRoute";

function App() {
  return (
    <Router>

      <Header />

      <Routes>

        {/* Public Routes */}
        <Route path="/" element={<Login />} />

        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/admin-signup" element={<AdminSignup />} />

        <Route path="/teacher-login" element={<TeacherLogin />} />
        <Route path="/teacher-signup" element={<TeacherSignup />} />

        <Route path="/student-login" element={<StudentLogin />} />
        <Route path="/student-signup" element={<StudentSignup />} />

        {/* Dashboard (All Logged Users) */}
        <Route element={<ProtectedRoute />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Admin */}
        <Route element={<RoleProtectedRoute role="ADMIN" />}>
          <Route path="/admin-approval" element={<AdminApproval />} />
        </Route>

        {/* Teacher */}
        <Route element={<RoleProtectedRoute role="TEACHER" />}>
          <Route path="/teacher-request" element={<TeacherReq />} />
        </Route>

        {/* Student */}
        <Route element={<RoleProtectedRoute role="STUDENT" />}>
          <Route path="/student-view" element={<StudentView />} />
        </Route>

      </Routes>

    </Router>
  );
}

export default App;