import React from 'react';
import '../css/login.css';
import RegisterForm from '../components/RegisterForm';


export default function Register() {
    return (
        <div className='login-container'>
            <RegisterForm></RegisterForm>
            <h1 className='logo'>Pearl</h1>
        </div>
    );
}