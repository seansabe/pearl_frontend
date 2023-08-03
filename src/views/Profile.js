import React from 'react';
import '../css/login.css';
import ProfileForm from '../components/ProfileForm';


export default function Profile(props) {
    return (
        <div className='container'>
            <ProfileForm handleNavClick={props.handleNavClick}></ProfileForm>
        </div>
    );
}