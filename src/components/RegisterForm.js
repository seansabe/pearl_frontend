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
    const routeProfile = () => {
        let path = `/profile`;
        navigate(path);
    }


    const saveUser = async () =>{
        try {
            const response = await axios.post(`${api}/user`, {
                firstName: firstName,
                lastName: lastName,
                address: address,
                phone: phone,
                email: email,
                password: password
            });
            console.log(response.data);
            if (response.data){
                localStorage.setItem('user', JSON.stringify(response.data));
                routeProfile();
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleRegister = async () => {
        
        if(firstName === "" || lastName === "" || phone === "" || email === "" || password === ""){
            setMessage('Fill the table, please.');
        }else{
            let emailCheck = true;
            try{
                const response = await axios.get(`${api}/user`);
                response.data.forEach(user => {
                    if(user.email === email){
                        setMessage("There is user with such email");
                        emailCheck = false;
                    }
                });
            }catch(error){
                console.error(error);
            }
            if(emailCheck){
                saveUser();
            }
        };      
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
                onClick={routeProfile}
                size="lg"
                variant="solid"
                fullWidth
            >Login</Button>
            <p id='message'>{message}</p>
        </form>
    );
}