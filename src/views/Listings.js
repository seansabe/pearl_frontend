import React, { useState, useEffect } from "react";
import Search from "../components/Search";
import ListingsComponent from "../components/ListingsComponent";
import CategoryFilter from "../components/CategoryFilter";
import "../css/listings.css";
import axios from "axios";

export default function Listings(props) {
  const [listings, setListings] = useState([]);
  const [filteredServices, setFilteredServices] = useState([]);
  const [showFiltered, setShowFiltered] = useState(false);

  useEffect(() => {
    const fetchListings = async () => {
      try {
        const response = await axios.get(`http://localhost:5001/api/service`);
        setListings(response.data);
      } catch (error) {
        console.error("Error fetching listings:", error);
      }
    };

    fetchListings();
  }, []);

  return (
    <div className="listing-container">
      <Search
        setFilteredServices={setFilteredServices}
        setShowFiltered={setShowFiltered}
      />
      <CategoryFilter
        listings={listings}
        setFilteredServices={setFilteredServices}
        setShowFiltered={setShowFiltered}
      />
      <ListingsComponent
        handleNavClick={props.handleNavClick}
        listings={listings}
        setListings={setListings}
        showFiltered={showFiltered}
        filteredServices={filteredServices}
      />
    </div>
  );
}
