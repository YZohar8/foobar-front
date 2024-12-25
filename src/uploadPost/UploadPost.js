import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './UploadPost.css';
import { addPost } from "../connectToDB/postsConnectToDB";

function UploadPost({ myUser, name, profilePic, whenAddPost, setErrorNote }) {
    const [postText, setPostText] = useState('');
    const [postImageBase64, setPostImageBase64] = useState(null);

    const fileInputRef = useRef(null); // Create a ref for the file input
    const navigate = useNavigate(); // Moved out of the handlePostSubmit function

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setPostImageBase64(reader.result); // Store the Base64 version
            };
            reader.readAsDataURL(file); // Convert the file to Base64
        } else {
            setPostImageBase64(null);
        }
    };

    const handlePostSubmit = async (e) => {
        e.preventDefault();

        if (postText) {
            const newPost = {
                text: postText,
                image: postImageBase64,
            };
            const result = await addPost(newPost, myUser.id);
            if (!result.success) {
                setErrorNote("problem with create new post: " + result.message);
                return;
            }

            whenAddPost();
            navigate('/feed');
        }

        // Clear post text and image
        setPostText('');

        // Reset the file input using the ref
        if (fileInputRef.current) {
            fileInputRef.current.value = ''; // This resets the file input field
        }
    };

    return (
        <div className="post-upload">
            <div className="user-info">
                <img src={profilePic} alt={`${name}'s profile`} className="user-image" />
                <span className="user-name">{name}</span>
            </div>
            <form onSubmit={handlePostSubmit} className="post-form">
                <textarea
                    className="post-text"
                    placeholder="What's on your mind?"
                    value={postText}
                    onChange={(e) => setPostText(e.target.value)}
                    required
                />
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className="image-input"
                    ref={fileInputRef} // Attach the ref to the file input
                />
                <button type="submit" className="submit-button">Post</button>
            </form>
        </div>
    );
}

export default UploadPost;
