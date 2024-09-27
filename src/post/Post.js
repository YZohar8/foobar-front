import React, { useState } from 'react'; // Ensure useState is properly imported from React
import './Post.css'; // Import the CSS for Post styling
import EditPostModel from '../editPostModel/EditPostModel.js';

// Function to calculate how much time has passed since the post was created
function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000); // Calculate the difference in seconds
  console.log(seconds);
  const minutes = Math.floor(seconds / 60); // Convert to minutes
  console.log(minutes);
  const hours = Math.floor(minutes / 60); // Convert to hours
  const days = Math.floor(hours / 24); // Convert to days
  const months = Math.floor(days / 28); // Convert to months
  const year = Math.floor(months / 12); // Convert to years

  // Return the appropriate time format based on the elapsed time
  if (year > 0) return `${year} years ago`;
  if (months > 0) return `${months} months ago`;
  if (days > 0) return `${days} days ago`;
  if (hours > 0) return `${hours} hours ago`;
  if (minutes > 0) return `${minutes} minutes ago`;
  return `${Math.floor(seconds)} seconds ago`;
}

// Post component to display individual posts
function Post({ realusername, Id, username, name, profilePic, postText, postPic, time }) {
  const [like, setLike] = useState(false); // State to track whether the post is liked
  const isEdit = (realusername === username); // Check if the logged-in user is the post author
  const [showModal, setShowModal] = useState(false);


  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);    

  // Function to toggle the like state
  const changeLike = () => {
    setLike(!like); // Flip the like state
  };

  const handleSave = (newText, newPic) => {
    setCurrentText(newText); 
    setCurrentPic(newPic); 
  };

  return (
    <div className="post-card">
      <div className="post-header">
        <img src={profilePic} alt={`${name}'s profile`} className="post-user-image" /> {/* User profile image */}
        <div className="post-user-info">
          <span className="post-user-name">{name}</span> {/* Display the user's name */}
          <span className="post-time">{timeSince(new Date(time))}</span> {/* Display how long ago the post was made */}
        </div>
        {/* Show the edit icon if the current user is the post's author */}
        {isEdit && (<i className="bi bi-pencil edit-post-button" onClick={handleShow}></i>)}
        <EditPostModel show={showModal} handleClose={handleClose} username={realusername} Id={Id} postText={postText} postPic={postPic}
        onSave={handleSave}/>
      </div>
      {/* Post content */}
      <div className="post-content">
        <p className="post-text">{postText}</p> {/* Display the post text */}
        {postPic && <img src={postPic} alt="Post" className="post-image" />} {/* Display post image if available */}
      </div>
      <hr />
      <div className="post-actions">
        {/* Toggle like button based on the 'like' state */}
        {!like ? (
          <i className="bi bi-hand-thumbs-up action-button" onClick={changeLike}></i> // Unliked state
        ) : (
          <i className="bi bi-hand-thumbs-up-fill action-button red" onClick={changeLike}></i> // Liked state (filled icon)
        )}
        <i className="bi bi-chat action-button"></i> {/* Comment button (no functionality added yet) */}
        <i className="bi bi-share action-button"></i> {/* Share button (no functionality added yet) */}
      </div>
    </div>
  );
}

export default Post;
