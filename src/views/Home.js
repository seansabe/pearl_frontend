import React, { useState } from "react";
import Nav from "../components/NavComponent";
import '../css/home.css'
import Listings from "./Listings";
import CreatePost from "./CreatePost";
import Profile from "./Profile";

import SecSettings from "./SecSettings";
import Login from "./Login";

export default function Home() {
    const [selectedEndpoint, setSelectedEndpoint] = useState("Listings");

    const handleNavClick = (endpoint) => {
        setSelectedEndpoint(endpoint);
    }
    return (
        <div>
            <Nav onNavClick={handleNavClick}></Nav>
            {selectedEndpoint === 'Listings' && <Listings />}
            {selectedEndpoint === 'CreatePost' && <CreatePost />}
            {selectedEndpoint === 'Profile' && <Profile handleNavClick={handleNavClick}/>}
            {selectedEndpoint === 'SecSettings' && <SecSettings handleNavClick={handleNavClick}/>}
            {selectedEndpoint === 'Login' && <Login />}
        </div>
    );
}