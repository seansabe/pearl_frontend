import React, { useEffect, useState } from 'react';
import { Button } from "@mui/joy";
import { useParams } from "react-router-dom";
import axios from "axios";
import { api } from "../utils/api";

const BookingComponent = (props) => {
  const { id } = useParams();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    fetchCurrentUser();
  }, []);

  const fetchCurrentUser = async () => {
    try {
      const storedUser = localStorage.getItem('user');
      if (storedUser) {
        const user = JSON.parse(storedUser);
        setCurrentUser(user);
      } else {
        console.log("Current user not found.");
      }
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const routeListings = () => {
    props.handleNavClick("Listings");
  }

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
        userId: currentUser._id,
      });
      console.log("Booking created:", response.data);
    } catch (error) {
      console.error("Error creating booking:", error);
    }
  };

  return (
    <div>
      <h1>Booking</h1>
      <form className='booking-form'>
        <label>Date:</label>
        <input type="date" value={date} onChange={handleDateChange} />
        <label>Time:</label>
        <input type="time" value={time} onChange={handleTimeChange} />
        <Button onClick={submitBooking}>Submit</Button>
        <div className='spacer'></div>
        <Button
          color="info"
          onClick={routeListings}
          size="lg"
          variant="solid"
          fullWidth
        >Cancel</Button>
      </form>
    </div>
  );
};

export default BookingComponent;
