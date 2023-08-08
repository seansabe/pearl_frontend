import React from "react";
import Button from "@mui/joy/Button";
import axios from "axios";

const categories = ["Hair", "Lash", "Make up"];

const CategoryFilter = ({ listings, setFilteredServices, setShowFiltered }) => {
  const getUserInfo = async (userId) => {
    try {
      const response = await axios.get(
        `http://localhost:5001/api/user/${userId}`
      );
      return response.data;
    } catch (error) {
      console.error("Error fetching user:", error);
      return null; // or some default user object
    }
  };

  const handleFilter = async (category) => {
    const filtered = listings.filter(
      (listing) => listing.kindOfService === category
    );

    const updatedFiltered = await Promise.all(
      filtered.map(async (listing) => {
        let user = await getUserInfo(listing.userId);
        return { ...listing, user };
      })
    );

    setFilteredServices(updatedFiltered);
    setShowFiltered(true);
  };

  return (
    <div className="filter-container">
      {categories.map((category) => (
        <Button
          key={category}
          variant="solid"
          color="info"
          onClick={() => handleFilter(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};

export default CategoryFilter;
