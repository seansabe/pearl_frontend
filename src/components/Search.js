import React, { useState } from "react";
import axios from "axios";

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
    <div>
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Search..."
          value={searchWord}
          onChange={(e) => setSearchWord(e.target.value)}
        />
        <button type="submit">Search</button>
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
