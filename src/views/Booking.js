import React from "react";
//import Search from "../components/Search";
import BookingComponent from "../components/BookingComponent";

export default function Booking(props) {
  return (
    <div className="booking-container">
      <BookingComponent handleNavClick={props.handleNavClick}></BookingComponent>
    </div>
  );
}
