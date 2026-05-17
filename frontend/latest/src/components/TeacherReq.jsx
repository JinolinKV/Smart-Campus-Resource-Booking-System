import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "../style/TeacherReq.css";

const TeacherReq = () => {
  const [name, setName] = useState("");
  const [year, setYear] = useState("");
  const [occasion, setOccasion] = useState("");
  const [venue, setVenue] = useState("");
  const [date, setDate] = useState("");
  const [startPeriod, setStartPeriod] = useState("");
  const [endPeriod, setEndPeriod] = useState("");

  const [email, setEmail] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");


  const [booked, setBooked] = useState([]);
  const [suggestedVenues, setSuggestedVenues] = useState([]);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const allVenues = ["Conference Hall", "EG Hall", "CSE LAB", "NM LAB"];

  // ---------------- FETCH STATUS ----------------
  useEffect(() => {
    if (date && startPeriod && endPeriod) {
      fetchVenueStatus();
    }
  }, [date, startPeriod, endPeriod]);

  useEffect(() => {

    const user = JSON.parse(localStorage.getItem("user"));

    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");
    }

  }, []);

  const fetchVenueStatus = async () => {
    try {
      const res = await axios.get(
  `https://smart-campus-resource-booking-system.onrender.com/resource/venue-status?date=${date}&period=${startPeriod}`
);
      setBooked(res.data?.booked || []);
    } catch (error) {
      console.log(error);
    }
  };

  const isBooked = (venueName) => {
    return booked.some((b) => b.venue === venueName);
  };

  const getBookingDetails = (venueName) => {
    return booked.find((b) => b.venue === venueName);
  };

  // ---------------- SUBMIT ----------------
  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");
    setSuggestedVenues([]);

    if (!name || !year || !occasion || !venue || !date || !startPeriod || !endPeriod) {
      alert("⚠️ Please fill all fields");
      return;
    }

    if (parseInt(startPeriod) > parseInt(endPeriod)) {
      alert("⚠️ Invalid period range");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post("https://smart-campus-resource-booking-system.onrender.com/resource/request", {
        name,
        year,
        occasion,
        venue,
        date,
        startPeriod: parseInt(startPeriod),
        endPeriod: parseInt(endPeriod),
        title,
        description
      });

      const data = res.data;
      console.log("Response:", data);

      if (!data || !data.status) {
        alert("❌ Invalid server response");
        return;
      }

      // ================= ✅ SUCCESS =================
      if (data.status === "SUCCESS") {
        alert(`✅ Booking Confirmed!\n\nVenue: ${data.assignedVenue}`);
        navigate("/dashboard");
      }

      // ================= 🔥 REPLACED =================
      else if (data.status === "REPLACED") {
        alert(
          `🔥 Higher Priority Booking!\n\nPrevious booking replaced.\nVenue: ${data.assignedVenue}`
        );
        navigate("/dashboard");
      }

      // ================= ❌ REJECTED =================
      else if (data.status === "REJECTED") {
        alert(
          `❌ Request Rejected\n\nReason: ${data.message}\nRetry Count: ${data.retry}`
        );
      }

      // ================= ⚠️ ALTERNATIVE =================
      else if (data.status === "ALTERNATIVE_AVAILABLE") {
        setMessage("⚠️ Selected venue is busy. Choose another:");

        // 🔥 FIX: correct key
        setSuggestedVenues(data.suggestedVenues || []);
      }

      // ================= 🔔 CONFIRM REPLACE =================
      else if (data.status === "CONFIRM_REPLACE") {
        const confirmReplace = window.confirm(
          "⚠️ A lower priority booking exists.\n\nDo you want to replace it?"
        );

        if (confirmReplace) {
          const retryRes = await axios.post("https://smart-campus-resource-booking-system.onrender.com/resource/request",{
              name,
              email,
              year,
              occasion,
              venue,
              date,
              startPeriod: parseInt(startPeriod),
              endPeriod: parseInt(endPeriod),
              title,
              description,
              forceReplace: true,
            }
          );

          const retryData = retryRes.data;

          alert(
            `🔥 Booking Replaced Successfully!\n\nVenue: ${retryData.assignedVenue}`
          );

          navigate("/dashboard");
        }
      }

    } catch (error) {
      console.log(error);

      if (error.response) {
        alert(`❌ Server Error: ${error.response.data?.message || "Error"}`);
      } else {
        alert("❌ Network error");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="teacher-page">
      <form className="teacher-form" onSubmit={handleSubmit}>
        <h2>Teacher Resource Request</h2>

        {/* INPUTS */}
        <div className="form-group">
          <label>Teacher Name</label>
          <input value={name} onChange={(e) => setName(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Class</label>
          <input value={year} onChange={(e) => setYear(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Occasion</label>
          <select value={occasion} onChange={(e) => setOccasion(e.target.value)}>
            <option value="">Select</option>
            <option value="WORKSHOP">Workshop</option>
            <option value="SEMINAR">Seminar</option>
            <option value="EVENT">Event</option>
            <option value="CLASS">Class</option>
          </select>
        </div>


        <input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={(e) => setDescription(e.target.value)} />

        <div className="form-group">
          <label>Date</label>
          <input type="date" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>

        <div className="form-group">
          <label>Start Period</label>
          <select value={startPeriod} onChange={(e) => setStartPeriod(e.target.value)}>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6, 7].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>End Period</label>
          <select value={endPeriod} onChange={(e) => setEndPeriod(e.target.value)}>
            <option value="">Select</option>
            {[1, 2, 3, 4, 5, 6, 7].map((p) => (
              <option key={p} value={p}>{p}</option>
            ))}
          </select>
        </div>

        {/* VENUES */}
        <div className="venue-grid">
          {allVenues.map((v) => {
            const bookedFlag = isBooked(v);
            const details = getBookingDetails(v);

            return (
              <div
                key={v}
                className={`venue-card ${venue === v ? "selected" : ""} ${bookedFlag ? "booked" : "available"
                  }`}
                onClick={() => setVenue(v)}
              >
                <h4>{v}</h4>

                {bookedFlag ? (
                  <div>
                    <p><b>Booked</b></p>
                    <p>{details?.name}</p>
                    <p>{details?.occasion}</p>
                  </div>
                ) : (
                  <p>Available</p>
                )}

                {venue === v && <p>✔ Selected</p>}
              </div>
            );
          })}
        </div>

        {/* MESSAGE */}
        {message && <div className="error-box">{message}</div>}

        {/* SUGGESTIONS */}
        {suggestedVenues.length > 0 && (
          <div className="suggestion-box">
            <h4>Suggested Venues</h4>
            {suggestedVenues.map((v) => (
              <button type="button" key={v} onClick={() => setVenue(v)}>
                {v}
              </button>
            ))}
          </div>
        )}

        <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Request"}
        </button>
      </form>
    </div>
  );
};

export default TeacherReq;