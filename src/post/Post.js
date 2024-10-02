import React, { useState } from 'react'; // Ensure useState is properly imported from React
import './Post.css'; // Import the CSS for Post styling
import EditPostModel from '../editPostModel/EditPostModel.js';
import PostResponses from '../postResponses/PostResponses.js';
import { deletePost } from '../fakeDatabase/postsFakeDatabase.js';
import { useNavigate } from 'react-router-dom';
import ShareButton from './ShareButton.js';
import LikeButton from './LikeButton.js';

// Function to calculate how much time has passed since the post was created
function timeSince(date) {
  const seconds = Math.floor((new Date() - date) / 1000); // Calculate the difference in seconds
  const minutes = Math.floor(seconds / 60); // Convert to minutes
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

  const isEdit = (realusername === username); // Check if the logged-in user is the post author

  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalResponses, setShowModalResponses] = useState(false);
  const navigate = useNavigate();





  const handleShowEdit = () => setShowModalEdit(true);
  const handleCloseEdit = () => setShowModalEdit(false);

  const handleShowResponses = () => setShowModalResponses(true);
  const handleCloseResponse = () => setShowModalResponses(false);


  const handleDeletePost = () => {
    if (!deletePost(Id)) {
      // error messege
    }
    navigate('/feed', { state: { username: username}});
  }



  return (
    <div className="post-card">
      <div className="post-header">
        <img src={profilePic} alt={`${name}'s profile`} className="post-user-image" /> {/* User profile image */}
        <div className="post-user-info">
          <span className="post-user-name">{name}</span> {/* Display the user's name */}
          <span className="post-time">{timeSince(new Date(time))}</span> {/* Display how long ago the post was made */}
        </div>
        {/* Show the edit icon if the current user is the post's author */}
        {isEdit && (<i className="bi bi-pencil edit-post-button" onClick={handleShowEdit}></i>)}
        {isEdit && (<i class="bi bi-trash3-fill edit-post-button" onClick={() => handleDeletePost()}></i>)}
        <EditPostModel show={showModalEdit} handleClose={handleCloseEdit} username={realusername} Id={Id} postText={postText} postPic={postPic} />
      </div>
      <hr />
      {/* Post content */}
      <div className="post-content">
        {postPic && <img src={postPic} alt="Post" className="post-image" />} {/* Display post image if available */}
        <p className="post-text post-text-to-show">{postText}</p> {/* Display the post text */}
      </div>
      <hr />
      <div className="post-actions">
        < LikeButton postId={Id}/>
        <i className="bi bi-chat action-button" onClick={handleShowResponses}></i>
        <PostResponses show={showModalResponses} handleClose={handleCloseResponse} postId={Id} username={realusername}/>
        <ShareButton />
      </div>
    </div>
  );
}

export default Post;
