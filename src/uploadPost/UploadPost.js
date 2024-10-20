import { React, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import './UploadPost.css';
import { addPost, nextIdPost } from "../fakeDatabase/postsFakeDatabase";

function UploadPost ({ username, name, profilePic, whenAddPost, setErrorNote}) {
    const [postText, setPostText] = useState('');
    const [postImageFile, setPostImageFile] = useState(null);
    const [postImageUrl, setPostImageUrl] = useState(null);
    
    const fileInputRef = useRef(null); // Create a ref for the file input
    const navigate = useNavigate(); // Moved out of the handlePostSubmit function
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        setPostImageFile(file);
        if (file) {
            setPostImageUrl(URL.createObjectURL(file)); // Generate a URL for preview
        } else {
            setPostImageUrl(null);
        }
    };
    
    const handlePostSubmit = (e) => {
        e.preventDefault();

        if (postImageUrl && postText) {
            const newPost = {
                Id: nextIdPost(),
                username,
                postText,
                postPicFile: postImageFile,
                postPic: null,
                time: new Date().getTime(),
                active: true,
                Likes: 0
            };
            if (!addPost(newPost)) {
                setErrorNote("problem with create new post");
                return;
            }
            
            whenAddPost();
            navigate('/feed', { state: { username: username } });
        }
        
        // Clear post text and image
        setPostText('');
        setPostImageUrl(null);

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
                    required
                />
                <button type="submit" className="submit-button">Post</button>
            </form>
        </div>
    );
}

export default UploadPost;
