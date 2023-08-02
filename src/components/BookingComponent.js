import React, { useState } from "react";
import { Button } from "@mui/joy";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";

const BookingComponent = () => {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const handleTimeChange = (event) => {
    setTime(event.target.value);
  };

  const submitBooking = async () => {
    try {
      const response = await axios.post(`${api}/booking`, {
        serviceId: id,
        date,
        time,
        // Add any other data you want to send to the server.
        // If the booking requires a user, you would also send the userId here.
      });
      console.log(response.data);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <h2>Booking</h2>
      <label>Date:</label>
      <input type="date" value={date} onChange={handleDateChange} />
      <label>Time:</label>
      <input type="time" value={time} onChange={handleTimeChange} />
      <Button onClick={submitBooking}>Submit</Button>
    </div>
  );
};

export default BookingComponent;
