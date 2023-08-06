import React, { useState } from "react";
import axios from "axios";
import Input from '@mui/joy/Input';
import Button from '@mui/joy/Button';

const Search = () => {
  const [searchWord, setSearchWord] = useState("");
  const [services, setServices] = useState([]);

  const handleSearch = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.get(
        `http://localhost:5001/api/search?search=${searchWord}`
      );
      setServices(response.data);
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSearch}>
        <Input
          sx={{ '--Input-decoratorChildHeight': '45px' }}
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
      <div>
        {services.map((service) => (
          <div key={service._id}>
            <h2>{service.serviceName}</h2>
            <p>{service.description}</p>
            {/* Render other service details */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Search;
