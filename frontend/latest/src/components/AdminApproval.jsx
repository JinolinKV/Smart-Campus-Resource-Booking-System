import React, { useEffect, useState } from "react";
import axios from "axios";
import '../style/AdminApproval.css'
const AdminApproval = () => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    fetchRequests();
  }, []);

  // fetch all requests
  const fetchRequests = async () => {
    try {
      const res = await axios.get(
        "https://smart-campus-resource-booking-system.onrender.com/resource/all"
      );
      setRequests(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  // approve request
  const handleApprove = async (id) => {
    try {
      await axios.put(
        `https://smart-campus-resource-booking-system.onrender.com/resource/approve/${id}`
      );
      fetchRequests();
    } catch (error) {
      console.log(error);
    }
  };

  // reject request
  const handleReject = async (id) => {
    try {
      await axios.put(
        `https://smart-campus-resource-booking-system.onrender.com/resource/reject/${id}`
      );

      fetchRequests();

      localStorage.setItem("role", "ADMIN");
      navigate("/dashboard");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="admin-container">

      <div className="admin-card">

        <h2>Admin Approval Panel</h2>

        <table className="admin-table">

          <thead>
            <tr>
              <th>Teacher</th>
              <th>Venue</th>
              <th>Date</th>
              <th>Periods</th>
              <th>Occasion</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>

          <tbody>

            {requests.map((req) => (
              <tr key={req.id}>

                <td>{req.name}</td>
                <td>{req.venue}</td>
                <td>{req.date}</td>

                <td>
                  {req.startPeriod} - {req.endPeriod}
                </td>

                <td>
                  <span className={`occasion ${req.occasion}`}>
                    {req.occasion}
                  </span>
                </td>

                <td>
                  <span className={`status ${req.status}`}>
                    {req.status}
                  </span>
                </td>

                <td>

                  {req.status === "PENDING" && (
                    <div className="action-buttons">

                      <button
                        className="approve-btn"
                        onClick={() => handleApprove(req.id)}
                      >
                        Approve
                      </button>

                      <button
                        className="reject-btn"
                        onClick={() => handleReject(req.id)}
                      >
                        Reject
                      </button>

                    </div>
                  )}

                </td>

              </tr>
            ))}

          </tbody>

        </table>

      </div>

    </div>
  );
};

export default AdminApproval;
