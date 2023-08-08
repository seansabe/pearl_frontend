import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import CustomRating from "./CustomRating";

const ListingComponent = () => {
  const [listings, setListings] = useState([]);

  const getUserInfo = async (userId) => {
    const response = await axios.get(`${api}/user/${userId}`);
    const user = response.data;
    //let fullName = `${user.firstName} ${user.lastName}`;
    return user;
  };

  useEffect(() => {
    
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${api}/service`);
        const listingsData = response.data;
    
        // Fetch the current user's information
        const currentUser = JSON.parse(localStorage.getItem('user'));
    
        // Filter out listings where userId is equal to the current user's id
        const filteredListingsData = listingsData.filter(listing => listing.userId !== currentUser._id);
    
        // Fetch the user (professional) information for each listing
        const updatedListings = await Promise.all(
          filteredListingsData.map(async (listing) => {
            let user = await getUserInfo(listing.userId);
            return { ...listing, user };
          })
        );
        setListings(updatedListings);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };
    

    fetchListings();
  }, []);


  // Inside the ListingComponent
  const navigate = useNavigate();

  const handleBook = (listingId) => {
    navigate(`/booking/${listingId}`);
  };

  return (
    <div className="card-grid">
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="card">
          <img
            src={
              process.env.PUBLIC_URL +
              `/images/${listing.kindOfService
                .replace(/\s/g, "")
                .toLowerCase()}.png`
            }
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <div className="card-rating">
              <CustomRating />{/* make dynamic */}
              <div className="card-service-type">{listing.kindOfService}</div>
            </div>
            <h2 className="card-title">
              {listing.name}
              <span className="card-user"> by {listing.user.firstName}</span>
            </h2>
            <div className="card-address">{listing.user.city}</div>
            <div
              className="card-service-description">
              {listing.name} Services Starting From ${listing.price}{" "}
              {listing.description}{" "}
            </div>
            <Button
              color="info"
              onClick={() => handleBook(listing._id)}
              size="lg"
              variant="solid"
              fullWidth
            >
              Book Now
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ListingComponent;
