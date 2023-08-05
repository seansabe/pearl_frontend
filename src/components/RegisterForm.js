import { Input, Button } from '@mui/joy';
import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../utils/api';
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {

    //const [id, setID] = useState('');
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


    let navigate = useNavigate();
    const routeHome = () => {
        let path = `/home`;
        navigate(path);
    }
    const routeLogin = () => {
        let path = `/`;
        navigate(path);
    }

    const saveUser = async () => {
        try {
            const response = await axios.post(`${api}/user`, {
                firstName: firstName,
                lastName: lastName,
                phone: phone,
                address: address,
                city: city,
                state: state,
                zip: zip,
                email: email,
                password: password
            });
            console.log(response.data);
            if (response.data) {
                localStorage.setItem('user', JSON.stringify(response.data));
                localStorage.setItem('currentUser', response.data.email);
            }
        } catch (error) {
            console.error(error);
        }
    }
    // const selectCity=(value)=>{
    //     setCity(value);
    // }
    const handleRegister = async () => {

        if (firstName === "" || lastName === "" || phone === "" || email === "" || password === "") {
            setMessage('Fill the table, please.');
        } else {
            let emailCheck = true;
            try {
                const response = await axios.get(`${api}/user`);
                response.data.forEach(user => {
                    if (user.email === email) {
                        setMessage("There is user with such email");
                        emailCheck = false;
                    }
                });
            } catch (error) {
                console.error(error);
            }
            if (emailCheck) {
                saveUser();
                routeHome();
            }
        };
    };
    return (
        <form className='registration-form'>
            <h1>Create an Account</h1>
            <Input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                color="info"
                placeholder="First Name"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setLastName(e.target.value)}
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
            {/* <Select
                onChange={(e) => selectCity(e.target.value)}
                // value={city}
                color="info"
                disabled={false}
                placeholder="City"
                size="lg"
                variant="soft"
                required
            >
                <option value="Vancouver">Vancouver</option>
                <option value="Toronto">Toronto</option>
                <option value="Montreal">Montreal</option>
            </Select> */}
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
            <Input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type='password'
                color="info"
                disabled={false}
                placeholder="Password"
                size="lg"
                required
            />
            <div className='spacer'></div>
            <Button
                id="registerButton"
                color="info"
                onClick={handleRegister}
                size="lg"
                variant="solid"
                fullWidth
                disabled={firstName === "" || lastName === "" || address === "" || city === "" || state === "" || zip === "" || phone === "" || email === "" || password === ""}
            >Create</Button>
            <div className='spacer'></div>
            <Button
                color="info"
                onClick={routeLogin}
                size="lg"
                variant="solid"
                fullWidth
            >Cancel</Button>
            <p id='message'>{message}</p>
        </form>
    );
}