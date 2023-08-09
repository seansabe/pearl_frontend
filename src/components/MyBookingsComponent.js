import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import { api } from "../utils/api";
//import { useNavigate } from "react-router-dom";
import CustomRating from "./CustomRating";

const MyBookingsComponent = () => {
  const [bookings, setBookings] = useState([]);
  const [id, setId] = useState('');

  const getServiceInfo = async (serviceId) => {
    const response = await axios.get(`${api}/service/${serviceId}`);
    const service = response.data;
    return service;
  };
  const getUserInfo = async (userId) => {
    const response = await axios.get(`${api}/user/${userId}`);
    const user = response.data;
    return user;
  };

  useEffect(() => {
    const storedUser = localStorage.getItem('user');
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setId(user._id);
    }

    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${api}/booking/user/${id}`);
        const hiresData = response.data;
        // Fetch the service information for each booking
        const updatedBookings = await Promise.all(
          hiresData.map(async (booking) => {
            let service = await getServiceInfo(booking.serviceId);
            let user = await getUserInfo(service.userId);
            return { ...booking, service, user };
          })
        );
        setBookings(updatedBookings);
      } catch (error) {
        console.error("Error fetching Bookings:", error);
      }
    }
    fetchBookings();
  }, [id]);

  const handleCancelBooking = async (hireId) => {
    try {
      await axios.delete(`${api}/booking/${hireId}`)
    } catch (e) {
      console.error("Error deleting Booking", e);
    }
    const fetchBookings = async () => {
      try {
        const response = await axios.get(`${api}/booking/user/${id}`);
        const bookingData = response.data;
        // Fetch the service information for each booking
        const updatedHires = await Promise.all(
          bookingData.map(async (booking) => {
            let service = await getServiceInfo(booking.serviceId);
            let user = await getUserInfo(service.userId);
            return { ...booking, service, user };
          })
        );
        setBookings(updatedHires);
      } catch (error) {
        console.error("Error fetching Bookings:", error);
      }
    }
    fetchBookings();
  }

  return (
    <div className="card-grid">
      {bookings.map((booking) => (
        <div
          key={booking._id}
          className="card">
          <img
            src={process.env.PUBLIC_URL + `/images/${booking.service.kindOfService.replace(/\s/g, "").toLowerCase()}.png`}
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <div className="row">
              <div className="card-rating"><CustomRating />{/* make dynamic */}</div>
              <div className="card-datetime">{booking.date.split("T")[0]} at {booking.time}</div>
              <div className="card-service-type">{booking.service.kindOfService}</div>
            </div>
            <h2 className="card-title">{booking.service.name}</h2>

            <div className="tag">Professional</div>
            <div className="card-user"> by {booking.user.firstName}</div>
            <div className="tag">Location</div>
            <div className="card-address">{booking.user.city}</div>
            <div className="tag">Price</div>
            <div className="card-service-price">${booking.service.price}</div>
            <div className="tag">Description</div>
            <div className="card-service-description">{booking.service.description}{" "}</div>
            <Button
              color="info"
              onClick={() => handleCancelBooking(booking._id)}
              size="lg"
              variant="solid"
              fullWidth
            >
              Cancel Booking
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};


export default MyBookingsComponent;
