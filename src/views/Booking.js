import React from "react";
import BookingComponent from "../components/BookingComponent";
import "../css/listings.css";

export default function Booking(props) {
  return (
    <div className="booking-container">
      <BookingComponent handleNavClick={props.handleNavClick}></BookingComponent>
    </div>
  );
}
