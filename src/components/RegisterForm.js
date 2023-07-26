import { Input, Button } from '@mui/joy';
import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../utils/api';
import { useNavigate } from "react-router-dom";

export default function RegisterForm() {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    let navigate = useNavigate();
    const routeLogin = () => {
        let path = `/`;
        navigate(path);
    }
    const handleRegister = async () => {
        try {
            const response = await axios.post(`${api}/register`, {
                firstName,
                lastName,
                address,
                phone,
                email,
                password
            });
            //setMessage(response.data.message);
            console.log(response.data.message);
            setMessage(response.data.message);
            if (response.data.success){
                routeLogin();
            }
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <form>
            <h1>Register</h1>
            <Input
                onChange={(e) => setFirstName(e.target.value)}
                value={firstName}
                color="info"
                placeholder="First Name"
                size="lg"
                variant="soft"
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
                variant="soft"
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
                variant="soft"
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
                variant="soft"
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
                variant="soft"
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
                variant="soft"
                required
            />
            <div className='spacer'></div>
            <Button
                color="info"
                onClick={handleRegister}
                size="lg"
                variant="solid"
                fullWidth
            >Register</Button>
            <div className='spacer'></div>
            <Button
                color="info"
                onClick={routeLogin}
                size="lg"
                variant="solid"
                fullWidth
            >Login</Button>
            <p id='message'>{message}</p>
        </form>
    );
}