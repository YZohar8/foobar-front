import React, { useState } from 'react';
import './LikeButton.css';
import { getLikes, setNumOfLikes } from '../fakeDatabase/postsFakeDatabase';

function LikeButton({postId}) {
  const [like, setLike] = useState(false); 

  const changeLike = () => {
    let num = 1;
    if (!like) {
      if (!setNumOfLikes(postId, num)) {
        // error messege
      }
      setLike(true);
    } else {
      num = -1;
      if (!setNumOfLikes(postId, num)) {
        // error messege
      }
      setLike(false);
    }
  };

  return (
    <div className="like-button-container">
       <span className="like-count">{getLikes(postId)}</span>
      {!like ? (
        <i className="bi bi-hand-thumbs-up action-button" onClick={() => changeLike()}></i> // Unliked state
      ) : (
        <i className="bi bi-hand-thumbs-up-fill action-button red" onClick={() => changeLike()}></i> // Liked state (filled icon)
      )}
    </div>
  );
}

export default LikeButton;