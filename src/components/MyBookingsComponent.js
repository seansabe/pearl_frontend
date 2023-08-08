import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import { api } from "../utils/api";
//import { useNavigate } from "react-router-dom";
import CustomRating from "./CustomRating";

const MyBookingsComponent = () => {
  const [hires, setHires] = useState([]);
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
    const fetchHires = async () => {

      try {
        const response = await axios.get(`${api}/booking/user/${id}`);
        const hiresData = response.data;
        // Fetch the service information for each hire
        const updatedHires = await Promise.all(
          hiresData.map(async (hire) => {
            let service = await getServiceInfo(hire.serviceId);
            let user = await getUserInfo(service.userId);
            return { ...hire, service, user };
          })
        );
        setHires(updatedHires);
      } catch (error) {
        console.error("Error fetching Hires:", error);
      }
    }
    fetchHires();
  }, [id]);

  const handleCancelBooking = async (hireId) => {
    try {
      await axios.delete(`${api}/booking/${hireId}`)
    } catch (e) {
      console.error("Error deleting Booking", e);
    }
    const fetchHires = async () => {

      try {
        const response = await axios.get(`${api}/booking/user/${id}`);
        const hiresData = response.data;
        // Fetch the service information for each hire
        const updatedHires = await Promise.all(
          hiresData.map(async (hire) => {
            let service = await getServiceInfo(hire.serviceId);
            let user = await getUserInfo(service.userId);
            return { ...hire, service, user };
          })
        );
        setHires(updatedHires);
      } catch (error) {
        console.error("Error fetching Hires:", error);
      }
    }
    fetchHires();
  }

  return (
    <div className="card-grid">
      {hires.map((hire) => (
        <div
          key={hire._id}
          className="card">
          <img
            src={process.env.PUBLIC_URL + `/images/${hire.service.kindOfService.replace(/\s/g, "").toLowerCase()}.png`}
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <div className="row">
              <div className="card-rating"><CustomRating />{/* make dynamic */}</div>
              <div className="card-service-type">{hire.service.kindOfService}</div>
            </div>
            <h2 className="card-title">{hire.service.name}</h2>

            <div className="tag">Professional</div>
            <div className="card-user"> by {hire.service.firstName}</div>
            <div className="tag">Location</div>
            <div className="card-address">{hire.user.city}</div>
            <div className="tag">Price</div>
            <div className="card-service-price">${hire.service.price}</div>
            <div className="tag">Description</div>
            <div className="card-service-description">{hire.service.description}{" "}</div>
            <Button
              color="info"
              onClick={() => handleCancelBooking(hire._id)}
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
