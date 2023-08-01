import React, { useState, useEffect } from "react";
import axios from "axios";
import { api } from '../utils/api';
import { Input, Button } from '@mui/joy';
import Select from '@mui/joy/Select';
import Option from '@mui/joy/Option';
import Textarea from '@mui/joy/Textarea';
import { useNavigate } from "react-router-dom";
import { Modal } from '@mui/joy';
import { ModalClose } from '@mui/joy';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';


const CreatePost = () => {
  
  // const for Modal
  const [open, setOpen] = React.useState(false);  

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

  let navigate = useNavigate();
  const turnBack = () => {
      let path = `/home`;
      navigate(path);
  }

  const goServicePage = () => {
    let path = `/service`;
    navigate(path);
  }

  const BasicModal = () => {
    return (
      <React.Fragment>
        <Modal
          open={open}
          onClose={() => goServicePage()}
          sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
        >
          <Sheet
            variant="soft"
            color="success"
            sx={{
              maxWidth: 500,
              borderRadius: 'md',
              p: 3,
              boxShadow: 'lg',
            }}
          >
            <ModalClose
              variant="soft"
              sx={{
                top: 'calc(-1/4 * var(--IconButton-size))',
                right: 'calc(-1/4 * var(--IconButton-size))',
                boxShadow: '0 2px 12px 0 rgba(0 0 0 / 0.2)',
                borderRadius: '50%',
                bgcolor: 'background.surface',
              }}
            />
            <Typography
              component="h2"
              id="modal-title"
              level="h4"
              textColor="inherit"
              fontWeight="lg"
              mb={1}
            >
              Success
            </Typography>
            <Typography id="modal-desc" textColor="text.tertiary">
            New service created successfully. You'll be redirected to the service page.
            </Typography>
          </Sheet>
        </Modal>
      </React.Fragment>
    );
            }
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
          setOpen(true)
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
      console.log("get current user");
      const email = localStorage.getItem('currentUser');
      const response = await axios.get(`${api}/user/email/${email}`);
      const user = response.data;
      console.log(user);
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
            alt="service type"
          />
          <div className="card-body">
            <div className="card-rating">5 Stars (12 Reviews){BasicModal()}</div>
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
              onClick={turnBack}
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
