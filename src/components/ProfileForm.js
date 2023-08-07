import { Input, Button } from '@mui/joy';
import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../utils/api';
//import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function ProfileForm(props) {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');
    const [city, setCity] = useState('');
    const [state, setState] = useState('');
    const [zip, setZip] = useState('');


    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            const user = JSON.parse(storedUser);
            console.log(user);
            setId(user._id);
            setFirstName(user.firstName);
            setLastName(user.lastName);
            setAddress(user.address);
            setPhone(user.phone);
            setEmail(user.email);
            setPassword(user.password);
            setCity(user.city);
            setState(user.state);
            setZip(user.zip);
        }
    }, []);

    const saveUser = async () => {
        try {
            const response = await axios.patch(`${api}/user/${id}`, {
                firstName: firstName,
                lastName: lastName,
                address: address,
                city: city,
                state: state,
                zip: zip,
                phone: phone,
                email: email,
                password: password
            });
            //console.log(response.data);
            if (response.data.acknowledged) {
                localStorage.setItem('user', JSON.stringify({
                    _id: id,
                    firstName: firstName,
                    lastName: lastName,
                    address: address,
                    city: city,
                    state: state,
                    zip: zip,
                    phone: phone,
                    email: email,
                    password: password
                }));
                setMessage("Changes has been saved successfully");
                document.getElementById('message').style.display = 'block';
            } else {
                setMessage("Saving is not successful")
            }
        } catch (error) {
            console.error(error);
        }
    }

    /*let navigate = useNavigate();
    const routeHome = () => {
        props.handleNavClick("Listings");
    }*/

    const routeSecSettings = () => {
        props.handleNavClick("SecSettings");
    }

    const handleSaveButton = async () => {
        setMessage('');
        if (firstName === "" || lastName === "" || address === "" || city === "" || state === "" || zip === "" || phone === "" || email === "") {
            setMessage('Fill the form, please.');
        } else {
            let emailCheck = true;
            try {
                const response = await axios.get(`${api}/user`);
                response.data.forEach(user => {
                    console.log(user._id);
                    if (user.email === email && user._id !== id) {
                        setMessage("There is user with such email");
                        emailCheck = false;
                    }
                });
            } catch (error) {
                console.error(error);
            }
            if (emailCheck) {
                saveUser();
                //routeHome();
            } else {
                console.log("error");
            }
        }
    }
    return (
        <form className='profile-form'>
            <h1>View your Profile</h1>
            <Input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                color="info"
                placeholder="First Name"
                size="lg"
                required
            />
            <div className='spacer'></div>
            < Input
                onChange={(e) => setLastName(e.target.value)
                }
                value={lastName}
                color="info"
                disabled={false}
                placeholder="Last Name"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setAddress(e.target.value)}
                value={address}
                color="info"
                disabled={false}
                placeholder="Address"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setCity(e.target.value)}
                value={city}
                color="info"
                disabled={false}
                placeholder="City"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setState(e.target.value)}
                value={state}
                color="info"
                disabled={false}
                placeholder="State"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setZip(e.target.value)}
                value={zip}
                color="info"
                disabled={false}
                placeholder="ZIP"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
                color="info"
                disabled={false}
                placeholder="Phone"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                color="info"
                disabled={false}
                placeholder="Email"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Button
                color="info"
                onClick={handleSaveButton}
                size="lg"
                variant="solid"
                fullWidth
                disabled={firstName === "" || lastName === "" || address === "" || city === "" || state === "" || zip === "" || phone === "" || email === ""}
            >Save Changes</Button>
            <div className='spacer'></div>
            <Button
                color="info"
                onClick={routeSecSettings}
                size="lg"
                variant="solid"
                fullWidth
            >Change Password</Button>
            <p id='message'>{message}</p>
        </form >
    );
}