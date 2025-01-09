import React, { useState } from 'react'; // Ensure useState is properly imported from React
import './Post.css'; // Import the CSS for Post styling
import EditPostModel from '../editPostModel/EditPostModel.js';
import PostResponses from '../postResponses/PostResponses.js';
import { getUserByUsernameOrId } from '../connectToDB/usersConnectToDB.js';
import { deletePost } from '../connectToDB/postsConnectToDB.js';
import { useNavigate } from 'react-router-dom';
import ShareButton from './ShareButton.js';
import LikeButton from './LikeButton.js';
import publicFun from '../../publicFun.js';



// Post component to display individual posts
function Post({ myUser, Id, authorId, name, profilePic, postText, postPic, time, refreshPosts, setError, likesCounter, commentsCounter , obIsProfile }) {
  const isEdit = (String(myUser.id) === String(authorId)); // Check if the logged-in user is the post author


  const [showModalEdit, setShowModalEdit] = useState(false);
  const [showModalResponses, setShowModalResponses] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();


  const handleShowEdit = () => setShowModalEdit(true);
  const handleCloseEdit = () => setShowModalEdit(false);

  const handleShowResponses = () => setShowModalResponses(true);
  const handleCloseResponse = () => {
    setShowModalResponses(false);
    refreshPosts();
  }


  const handleDeletePost = async () => {
    const result = await deletePost(Id);
    if (!result.success) {
      setError("delete post faild");
    }
    refreshPosts();
  }

  const handleGoToProfileFeed = async () => {
    const result = await getUserByUsernameOrId(authorId);
    if (!result.success) {
      setError("problem with the move the profile feed");
    } else {
      const userProfile = result.user;
      navigate('/profilefeed', { state: { myUser, userProfile } });

    }
  }


  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };



  return (
    <div className="post-card">
      <div className="post-header">
        <img src={profilePic} alt={`${name}'s profile`} className="post-user-image" onClick={() => handleGoToProfileFeed()} /> {/* User profile image */}
        <div className="post-user-info">
          <span className="post-user-name">{name}</span> {/* Display the user's name */}
          <span className="post-time">{publicFun.timeSince(new Date(time))}</span> {/* Display how long ago the post was made */}
        </div>
        {/* Show the edit icon if the current user is the post's author */}
        {isEdit &&
          <div className="action-menu-container">
            <i className="bi bi-three-dots" onClick={toggleMenu}></i>
            {isMenuOpen && (
              <div className="action-menu action-button-small">
                <ul>
                  <li onClick={() => handleShowEdit()}>
                    <i className="bi bi-pencil" ></i> Edit
                  </li>
                  <li onClick={() => handleDeletePost(Id)}>
                    <i className="bi bi-trash" ></i> Delete
                  </li>
                </ul>
              </div>
            )}
          </div>}
        <EditPostModel show={showModalEdit} handleClose={handleCloseEdit} Id={Id} postText={postText} postPic={postPic} refreshPosts={refreshPosts} />
      </div>
      <hr />
      {/* Post content */}
      <div className="post-content">
        {postPic && <img src={postPic} alt="Post" className="post-image" />} {/* Display post image if available */}
        <p className="post-text post-text-to-show">{postText}</p> {/* Display the post text */}
      </div>
      <hr />
      <div className="post-actions">
        <LikeButton postId={Id} likesCounter={likesCounter} setError={setError} userId={myUser.id} />
        <div className="like-button-container">
          <span className="like-count">{commentsCounter}</span>
          <i className="bi bi-chat action-button" onClick={() => handleShowResponses()}></i>
        </div>
        <PostResponses show={showModalResponses} handleClose={handleCloseResponse} postId={Id} userId={myUser.id} obIsProfile={obIsProfile}/>
        <ShareButton />
      </div>
    </div>
  );
}

export default Post;
