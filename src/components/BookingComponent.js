import React, { useEffect, useState } from 'react';
import { Button } from "@mui/joy";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";

const BookingComponent = () => {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    console.log("Fetching the current user");
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
        console.log("Current user found. " + user._id);
      } else {
        console.log("Current user not found.");
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };


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
        userId : currentUser._id,
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
