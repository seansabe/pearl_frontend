import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "@mui/joy";
import { api } from "../utils/api";
//import { useNavigate } from "react-router-dom";
import CustomRating from "./CustomRating";
import BookingComponent from "./BookingComponent";
import { Modal } from '@mui/joy';
import { ModalClose } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';

const ListingComponent = (props) => {
  const [listings, setListings] = useState([]);
  const [currentUser, setCurrentUser] = useState(null);
  // const for Modal Box
  const [isBookingModalOpen, setBookingModalOpen] = useState(false);

  const openBookingModal = () => {
    setBookingModalOpen(true);
  };

  const closeBookingModal = () => {
    setBookingOpen(false);
    setBookingModalOpen(false);
  };

  const getUserInfo = async (userId) => {
    const response = await axios.get(`${api}/user/${userId}`);
    const user = response.data;
    //let fullName = `${user.firstName} ${user.lastName}`;
    return user;
  };
  const [bookingOpen, setBookingOpen] = useState(false); // open or close booking component
  const [selectedListing, setSelectedListing] = useState(null); // selected listing to book

  const handleBookingOpen = (listing) => {
    setBookingOpen(true);
    setSelectedListing(listing);
  };

  const BasicModal = () => {
    //console.log("BasicModal called");
    //console.log("isBookingModalOpen:", isBookingModalOpen);
    //console.log("closeBookingModal:", closeBookingModal);
    return (
      <React.Fragment>
        <Modal
          open={isBookingModalOpen}
          onClose={closeBookingModal}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="soft"
            color="success"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose
              variant="soft"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.surface',
              }}
            />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Success
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
              Your booking has been created.
            </Typography>
          </Sheet>
        </Modal>
      </React.Fragment>
    );
  }
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
    fetchCurrentUser();
  }, []);

  // Inside the ListingComponent
  /*
  const navigate = useNavigate();

  const handleBook = (listingId) => {
    navigate(`/booking/${listingId}`);
  };*/

  //const routeBooking = () => {
  //  props.handleNavClick("Booking");

  //}

  return (
    <div className="card-grid">
      {<BasicModal />}
      {bookingOpen && (
        <BookingComponent
          selectedListing={selectedListing}
          currentUser={currentUser}
          onClose={openBookingModal}
        />
      )}
      {listings.map((listing) => (
        <div
          key={listing._id}
          className="card">
          <img
            src={process.env.PUBLIC_URL + `/images/${listing.kindOfService.replace(/\s/g, "").toLowerCase()}.png`}
            className="card-img-top"
            alt=""
          />
          <div className="card-body">
            <div className="row">
              <div className="card-rating"><CustomRating />{/* make dynamic */}</div>
              <div className="card-service-type">{listing.kindOfService}</div>
            </div>
            <h2 className="card-title"> {listing.name}</h2>

            <div className="tag">Professional</div>
            <div className="card-user"> by {listing.user.firstName}</div>
            <div className="tag">Location</div>
            <div className="card-address">{listing.user.city}</div>
            <div className="tag">Price</div>
            <div className="card-service-price">${listing.price}</div>
            <div className="tag">Description</div>
            <div className="card-service-description">{listing.description}{" "}</div>

            <div className='spacer'></div>
            <Button
              className="card-button"
              color="info"
              onClick={() => handleBookingOpen(listing)}
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