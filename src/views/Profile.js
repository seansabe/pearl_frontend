import React from 'react';
import '../css/profile.css';
import ProfileForm from '../components/ProfileForm';


export default function Profile(props) {
    return (
        <div className='profile-container'>
            <ProfileForm handleNavClick={props.handleNavClick}></ProfileForm>
        </div>
    );
}