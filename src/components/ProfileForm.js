import { Input, Button } from '@mui/joy';
import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../utils/api';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function ProfileForm() {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [message, setMessage] = useState('');


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
        }
    }, []);
    const saveUser = async () =>{
        try {
            const response = await axios.patch(`${api}/user/${id}`, {
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
                console.log("User saved successfully");
            }
        } catch (error) {
            console.error(error);
        }
    }
    
    let navigate = useNavigate();
    const routeProfile = () => {
        let path = `/profile`;
        navigate(path);
    }

    const routeSecSettings = () => {
        let path = `/security`;
        navigate(path);
    }

    
    
    const handleSaveButton = async () => {
        setMessage('');
        if(firstName === "" || lastName === "" || phone === "" || email === "" ){
            setMessage('Fill the form, please.');
        }else{
            let emailCheck = true;
            try{
                const response = await axios.get(`${api}/user`);
                response.data.forEach(user => {
                    console.log(user._id);
                    if(user.email === email && user._id !== id){
                        setMessage("There is user with such email");
                        emailCheck = false;
                        
                    }
                });
            }catch(error){
                console.error(error);
            }
            if(emailCheck){
                saveUser();
            }else{
                console.log("error");
            }
        }
    }      
    return (
        <form>
            <h1>Profile</h1>
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
            <Button
                color="info"
                onClick={handleSaveButton}
                size="lg"
                variant="solid"
                fullWidth
            >Save</Button>
            <div className='spacer'></div>
            <Button
                color="info"
                onClick={routeSecSettings}
                size="lg"
                variant="solid"
                fullWidth
            >Security settings</Button>
            <p id='message'>{message}</p>
        </form>
    );
}