import React from 'react';
import '../css/login.css';
import SecSettingsForm from '../components/SecSettingsForm';


export default function SecSettings(props) {
    return (
        <div className='profile-container'>
            <SecSettingsForm handleNavClick={props.handleNavClick}></SecSettingsForm>
        </div>
    );
}