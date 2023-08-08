import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";
import CustomRating from "./CustomRating";

const ListingComponent = ({ showFiltered, filteredServices }) => {
  const [listings, setListings] = useState([]);

  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(`${api}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // or some default user object
    }
  };

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`${api}/service`);
        const listingsData = response.data;

        // Fetch the user(professional) information for each listing
        const updatedListings = await Promise.all(
          listingsData.map(async (listing) => {
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

  const navigate = useNavigate();

  const handleBook = (listingId) => {
    navigate(`/booking/${listingId}`);
  };

  return (
    <div className="card-grid">
      {(showFiltered ? filteredServices : listings).map((listing) => (
        <div key={listing._id} className="card">
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
              <CustomRating />
              {/* make dynamic */}
              <div className="card-service-type">{listing.kindOfService}</div>
            </div>
            <h2 className="card-title">
              {listing.name}
              <span className="card-user">
                {listing.user ? ` by ${listing.user.firstName}` : " Loading..."}
              </span>
            </h2>
            <div className="card-address">
              {listing && listing.user && listing.user.city
                ? listing.user.city
                : " Loading..."}
            </div>
            <div className="card-service-description">
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
