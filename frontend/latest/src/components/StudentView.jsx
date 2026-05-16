import React, { useEffect, useState } from "react";
import axios from "axios";

const StudentView = () => {

  const [data, setData] = useState([]);

  // fetch approved resources
  useEffect(() => {
    fetchResources();
  }, []);

  const fetchResources = async () => {
    try {

      const res = await axios.get(
        "http://localhost:8080/resource/approved"
      );

      setData(res.data);

    } catch (error) {
      console.log("Error fetching resources", error);
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Resource Availability</h2>

      <table border="1" cellPadding="10">
        <thead>
          <tr>
            <th>Venue</th>
            <th>Date</th>
            <th>Periods</th>
            <th>Status</th>
            <th>Occasion</th>
          </tr>
        </thead>

        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan="5">No Resources Found</td>
            </tr>
          ) : (
            data.map((item) => (
              <tr key={item.id}>
                <td>{item.venue}</td>

                <td>{item.date}</td>

                <td>
                  {item.startPeriod} - {item.endPeriod}
                </td>

                <td
                  style={{
                    color: "red",
                    fontWeight: "bold",
                  }}
                >
                  OCCUPIED
                </td>

                <td>{item.occasion}</td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default StudentView;