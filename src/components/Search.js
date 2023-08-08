import React, { useState } from "react";
import axios from "axios";
import Input from "@mui/joy/Input";
import Button from "@mui/joy/Button";

const Search = ({ setFilteredServices, setShowFiltered }) => {
  const [searchWord, setSearchWord] = useState("");

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

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5001/api/search?search=${searchWord}`
      );

      const searchData = response.data;

      const updatedSearchData = await Promise.all(
        searchData.map(async (listing) => {
          let user = await getUserInfo(listing.userId);
          return { ...listing, user };
        })
      );
      setFilteredServices(updatedSearchData);
      setShowFiltered(true);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <Input
          sx={{ "--Input-decoratorChildHeight": "45px" }}
          placeholder="Search services"
          type="text"
          color="info"
          required
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
          endDecorator={
            <Button
              variant="solid"
              color="info"
              type="submit"
              sx={{ borderTopLeftRadius: 0, borderBottomLeftRadius: 0 }}
            >
              Go!
            </Button>
          }
        />
      </form>
    </div>
  );
};

export default Search;
