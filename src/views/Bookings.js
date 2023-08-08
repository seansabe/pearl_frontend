import React from "react";
import MyBookingsComponent from '../components/MyBookingsComponent';
import '../css/listings.css'


export default function Bookings() {
  return (
    <div className="listing-container">
      <MyBookingsComponent></MyBookingsComponent>
    </div>
  );
}
