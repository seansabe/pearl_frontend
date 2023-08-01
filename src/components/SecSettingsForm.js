import { Input, Button } from '@mui/joy';
import React, { useState } from 'react';
import axios from 'axios';
import { api } from '../utils/api';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function SecSettingsForm() {
    const [id, setId] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [address, setAddress] = useState('');
    const [phone, setPhone] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [newPasswordRepeat, setNewPasswordRepeat] = useState('');
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

    let navigate = useNavigate();
    const routeProfile = () => {
        let path = `/profile`;
        navigate(path);
    }


    const saveUser = async () =>{
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
                password: newPassword
            });
            console.log(response.data);
            if (response.data){
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
                                                password: newPassword}));
                console.log("User saved successfully");
                routeProfile();
            }
        } catch (error) {
            console.error(error);
        }
    }
    const handleSaveButton = async () => {
        
        if(oldPassword === "" || newPassword === "" || newPasswordRepeat === ""){
            setMessage('Fill the form, please.');
        }else{
            if(oldPassword === password){
                if(newPassword===newPasswordRepeat){
                    setMessage("");
                    saveUser();
                }else{
                    setMessage("Incorrect repeat password");
                }
            }else{
                setMessage("Incorrect old password");
            }
        };      
    };
    return (
        <form>
            <h1>Security Settings</h1>
            <Input
                onChange={(e) => setOldPassword(e.target.value)}
                value={oldPassword}
                type= 'password'
                color="info"
                disabled={false}
                placeholder="Old password"
                size="lg"
                variant="soft"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setNewPassword(e.target.value)}
                value={newPassword}
                type='password'
                color="info"
                disabled={false}
                placeholder="New password"
                size="lg"
                variant="soft"
                required
            />
            <div className='spacer'></div>
            <Input
                onChange={(e) => setNewPasswordRepeat(e.target.value)}
                value={newPasswordRepeat}
                type='password'
                color="info"
                disabled={false}
                placeholder="Repeat new password"
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
                disabled={oldPassword === "" || newPassword === "" || newPasswordRepeat === ""}
            >Save</Button>
            <div className='spacer'></div>
            <p id='message'>{message}</p>
        </form>
    );
}