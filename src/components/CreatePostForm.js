import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from '../utils/api';
import { Input, Button } from '@mui/joy';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';


const CreatePost = () => {

  const [currentUser, setCurrentUser] = useState("");
  const [createPostRequest, setCreatePostRequest] = useState({
    userId: "",
    name: "",
    description: "",
    price: 20,
    kindOfService: 'Hair',
  });
  const [message, setMessage] = useState("");
  const [selectedService, setSelectedService] = useState("Hair");

  useEffect(() => {
    setMessage("");
    getCurrentUser();
  }, []);


  const createPost = (event) => {
    event.preventDefault();
    if (
      createPostRequest.name === "" ||
      createPostRequest.price <= 0 ||
      createPostRequest.kindOfService === "" ||
      createPostRequest.description === ""
    ) {
      setMessage("Please fill out all required fields.");
    } else {
      createPostRequest.userId = currentUser._id;
      console.log("Request" + createPostRequest);
      // Make the API call using Axios
      axios
        .post(`${api}/service`, createPostRequest)
        .then((response) => {
          console.log(response);
          let service = response.data;
          console.log(service);
          setMessage("Service created successfully");
          setCreatePostRequest({
            userId: "",
            name: "",
            description: "",
            price: 20,
            kindOfService: "Hair",
          });
        })
        .catch((error) => {
          setMessage(error.response.data.message);
          console.log(error.response.data);
        });
    }
  };

  const getCurrentUser = async () => {
    try {
      // get user by email
      const email = localStorage.getItem("currentUser");
      const response = await axios.get(`${api}/user/email/${email}`);
      const user = response.data;
      setCurrentUser(user);
      console.log("Current user's email is : " + email);
    } catch (error) {
      console.error('Error fetching user:', error);
    }
  };

  const handleServiceChange = (value) => {
    setCreatePostRequest({
      ...createPostRequest,
      kindOfService: value,
    });
    setSelectedService(value);
  };


  // Preview section
  const renderPreview = () => {
    return (
      <div className="form-preview">
        <h2>Preview</h2>
        <div className="card">
          <img
            src={process.env.PUBLIC_URL + `/images/${selectedService.replace(/\s/g, '').toLowerCase()}.png`}
            className="card-img-top"
            style={{ width: "440px", height: "315px" }}
          />
          <div className="card-body">
            <div className="card-rating">5 Stars (12 Reviews)</div>
            <div className="card-service-type">{createPostRequest.kindOfService}</div>
            <h2 className="card-title">
              {createPostRequest.name || "Service Name "} <br></br><span className="card-user"> by {currentUser.firstName}</span>
            </h2>
            <div className="card-address">{currentUser.city}</div>
            <div className="card-service-description"> {createPostRequest.name || "Service Name "} Services Starting From ${createPostRequest.price} <br></br> {createPostRequest.description} </div>
            <Button
              color="info"
              size="lg"
              variant="solid"
            >Book Now</Button>
          </div>
        </div>
      </div>


    );
  };

  return (
    <div className="form-wrapper">
      <div className="form-container">
        <form className="formCreatePost">
          <div className="form-header">
            <button className="back-btn"
              color="info"
              onClick={() => window.history.back()} /* TO DO: Add a link to the previous page */
              size="md"
              variant="solid"
              fullWidth
            >
              Back
            </button>
            <h1>Create a Service</h1>
          </div>
          <label htmlFor="serviceName" className="form-label">
            Service Name
          </label>
          <Input
            onChange={(e) =>
              setCreatePostRequest({
                ...createPostRequest,
                name: e.target.value,
              })
            }
            value={createPostRequest.name}
            color="info"
            disabled={false}
            placeholder="Ex. Haircut"
            size="lg"
            variant="soft"
            required={true}
            id="jobTitle"
          />
          <div>
            <br></br>
            <label htmlFor="jobType" className="form-label">
              Kind Of Service
            </label>
            <Select defaultValue="Hair"
              className="form-select"
              color="info"
              disabled={false}
              size="lg"
              variant="soft"
              onChange={(e) => handleServiceChange(e.target.textContent)}
            >
              <Option value="Hair">Hair</Option>
              <Option value="Lash">Lash</Option>
              <Option value="Make up">Make up</Option>
            </Select>
          </div>
          <div>
            <label htmlFor="price" className="form-label">
              Price
            </label>
            <Input
              type="number"
              startDecorator="$"
              defaultValue={createPostRequest.price}
              slotProps={{
                input: {
                  min: 10,
                  max: 1000,
                  step: 5,
                },
              }}
              className="form-control"
              id="price"
              value={createPostRequest.price}
              onChange={(e) =>
                setCreatePostRequest({
                  ...createPostRequest,
                  price: e.target.value,
                })
              }
              color="info"
              disabled={false}
              size="lg"
              variant="soft"
              required={true}
            />
          </div>
          <div>
            <br></br>
            <label htmlFor="description" className="form-label">
              Description
            </label>
            <br></br>
            <Textarea
              className="form-control"
              id="description"
              value={createPostRequest.description}
              color="info"
              minRows={2}
              placeholder=""
              size="lg"
              variant="soft"
              onChange={(e) =>
                setCreatePostRequest({
                  ...createPostRequest,
                  description: e.target.value,
                })
              }
            />
          </div>
          <p id='form-error-message'>
            {message}
          </p>
          <button
            type="submit"
            className="form-submit-btn"
            id="btnSubmit"
            onClick={createPost}
          >Create
          </button>
        </form>
      </div>
      <div className="preview-container">
        {renderPreview()}
      </div>
    </div>

  );
};

export default CreatePost;
