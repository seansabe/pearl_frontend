import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import { api } from "../utils/api";
import { useNavigate } from "react-router-dom";

const ListingComponent = () => {
  const [listings, setListings] = useState([]);

  const getUserInfo = async (userId) => {
    console.log("get user full name");
    const response = await axios.get(`${api}/user/${userId}`);
    const user = response.data;
    console.log(user);
    //let fullName = `${user.firstName} ${user.lastName}`;
    return user;
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

  // Inside the ListingComponent
  const navigate = useNavigate();

  const handleBook = (listingId) => {
    // Handle booking logic here for the given listingId
    // For example, you can redirect to a booking page or show a modal to confirm the booking.
    console.log(`Booking listing with id: ${listingId}`);
    navigate(`/booking/${listingId}`);
  };

  return (
    <div style={{ display: "flex", flexWrap: "wrap" }}>
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="card"
          style={{
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#ffffff",
            margin: "5px",
            border: "1px solid #dddddd",
          }}
        >
          <img
            src={
              process.env.PUBLIC_URL +
              `/images/${listing.kindOfService
                .replace(/\s/g, "")
                .toLowerCase()}.png`
            }
            className="card-img-top"
            style={{ width: "318px", height: "228px" }}
          />
          <div className="card-body">
            <div className="card-rating">
              5 Stars (12 Reviews) {/* make dynamic */}{" "}
            </div>
            <div className="card-service-type">{listing.kindOfService}</div>
            <h2 className="card-title">
              {listing.name} <br></br>
              <span className="card-user"> by {listing.user.firstName}</span>
            </h2>
            <div className="card-address">{listing.user.city}</div>
            <div
              className="card-service-description"
              style={{
                marginBottom: "10px",
                width: "318px",
                height: "50px",
                overflowY: "auto",
              }}
            >
              {listing.name} Services Starting From ${listing.price} <br></br>{" "}
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
