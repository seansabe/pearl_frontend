import { Input, Button } from '@mui/joy';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { api } from '../utils/api';
import { useNavigate } from "react-router-dom";

export default function LoginForm() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');

    // Function to navigate from login page to home after verifying credentials
    let navigate = useNavigate();
    const routeHome = () => {
        let path = '/home';
        navigate(path);
    }
    const routeRegister = () => {
        let path = `/register`;
        navigate(path);
    }

    useEffect(() => {
        const currentUser = localStorage.getItem("currentUser");
        if (currentUser) {
            setEmail(currentUser);
            routeHome();
        }
    }, []);

    const handleLogin = async () => {
        try {
            const response = await axios.post(`${api}/login`, {
                email,
                password,
            });

            // Save logged in user to local storage
            localStorage.setItem("currentUser", email);
            localStorage.setItem("user", JSON.stringify(response.data.user));

            //setMessage(response.data.message);
            console.log(response.data.user); // To get the User object
            routeHome();
        } catch (error) {
            if (error.response && error.response.status === 401) {
                setMessage('Invalid username or password');
            } else {
                setMessage('An error occurred while logging in.');
            }
            console.error(error.response);
        }
    };
    return (
        <form className='login'>
            <h1>Pearl</h1>
            <Input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                color="info"
                disabled={false}
                placeholder="Email"
                size="lg"
                variant="soft"
                required={true}
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
                required={true}
            />
            <div className='spacer'></div>
            <Button
                color="info"
                onClick={handleLogin}
                size="lg"
                variant="solid"
                fullWidth
            >Login</Button>
            <div className='spacer'></div>
            <Button
                color="info"
                onClick={routeRegister}
                size="lg"
                variant="solid"
                fullWidth
            >Register</Button>
            <p id='message'>{message}</p>
        </form>
    );
}