import React, { useState } from "react";
import Nav from "../components/NavComponent";
import '../css/home.css'
import Listings from "./Listings";
import CreatePost from "./CreatePost";
import Profile from "./Profile";
import Login from "./Login";
import SecSettings from "./SecSettings";
import DashboardProvider from "./DashboardProvider";
import Booking from "./Booking";
import Bookings from "./Bookings";

export default function Home() {
    const [selectedEndpoint, setSelectedEndpoint] = useState("Listings");

    const handleNavClick = (endpoint) => {
        setSelectedEndpoint(endpoint);
    }
    return (
        <div className="main-container">
            <Nav onNavClick={handleNavClick}></Nav>
            <div className="content-container">
                {selectedEndpoint === 'Listings' && <Listings handleNavClick={handleNavClick} />}
                {selectedEndpoint === 'Booking' && <Booking handleNavClick={handleNavClick} />}
                {selectedEndpoint === 'MyBookings' && <Bookings handleNavClick={handleNavClick} />}
                {selectedEndpoint === 'CreatePost' && <CreatePost handleNavClick={handleNavClick} />}
                {selectedEndpoint === 'Profile' && <Profile handleNavClick={handleNavClick} />}
                {selectedEndpoint === 'SecSettings' && <SecSettings handleNavClick={handleNavClick} />}
                {selectedEndpoint === 'MyServices' && <DashboardProvider handleNavClick={handleNavClick} />}
                {selectedEndpoint === 'Login' && <Login />}
            </div>
        </div>
    );
}