import React from 'react';
import CreatePostForm from '../components/CreatePostForm';
import '../css/createpost.css';


export default function CreatePost(props) {
    return (
        <div className='wrapperCreatePost'>
            <CreatePostForm handleNavClick={props.handleNavClick}></CreatePostForm>
        </div>
    );
}