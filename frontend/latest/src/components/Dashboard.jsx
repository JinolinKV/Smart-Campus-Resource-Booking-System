import React, { useEffect, useState } from "react";
import axios from "axios";
import "../style/Dashboard.css";

const Dashboard = () => {

  const [resources, setResources] = useState([]);
  const role = localStorage.getItem("role");

  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {
      const res = await axios.get(
        "https://smart-campus-resource-booking-system.onrender.com/resource/status"
      ); tResources(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h2>Resource Dashboard</h2>
        <span className="role-badge">{role}</span>
      </div>

      <div className="table-container">
        <table className="styled-table">

          <thead>
            <tr>
              <th>Class</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Start</th>
              <th>End</th>
              <th>Occasion</th>
              <th>Title</th>
              <th>Info</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {resources.map((r) => (
              <tr key={r.id}>
                <td>{r.year}</td>
                <td>{r.venue}</td>
                <td>{r.date}</td>
                <td>{r.startPeriod}</td>
                <td>{r.endPeriod}</td>

                <td>{r.occasion}</td>
                <td>{r.title || "-"}</td>

                <td>
                  {r.status === "REPLACED" && (
                    <span style={{ color: "orange" }}>
                      {r.replacementReason}
                    </span>
                  )}

                  {r.status === "REJECTED" && (
                    <span style={{ color: "red" }}>
                      {r.rejectionReason}
                    </span>
                  )}

                  {r.status === "SUCCESS" && (
                    <span style={{ color: "green" }}>
                      {r.description}
                    </span>
                  )}
                </td>

                <td>
                  <span className={`status ${r.status.toLowerCase()}`}>
                    {r.status}
                  </span>
                </td>

              </tr>
            ))}
          </tbody>

        </table>
      </div>

    </div>
  );
};

export default Dashboard;