import React, { useEffect, useState } from 'react';
import likesConnectToDB from '../connectToDB/likesConnectToDB';
import './LikeButton.css';

function LikeButton({postId, likesCounter , setError, userId}) {
  const [like, setLike] = useState(false);
  const [numOfLikes, setNumOfLikes] = useState(likesCounter);

  useEffect(() => {
    reloadThePage();
  }, [])

  const reloadThePage = async () => {
    const ILike = await likesConnectToDB.checkUserLike(postId, userId);
    if(ILike.success) {
      if (ILike.result) {
        setLike(true)
      } else {
        setLike(false)
      }
    } else {
      setError(ILike.message);
    }
  }
  

  const changeLike = async () => {
    const response = await likesConnectToDB.updateLike(postId, userId);
    if (response.success) {
        if (like) {
          setLike(false);
          setNumOfLikes(numOfLikes - 1);
        } else {
          setLike(true);
          setNumOfLikes(numOfLikes + 1);
        }
    } else {
      setError(response.message);
    }
  };

  return (
    <div className="like-button-container">
       <span className="like-count">{numOfLikes}</span>
      {!like ? (
        <i className="bi bi-hand-thumbs-up action-button" onClick={() => changeLike()}></i> // Unliked state
      ) : (
        <i className="bi bi-hand-thumbs-up-fill action-button blue" onClick={() => changeLike()}></i> // Liked state (filled icon)
      )}
    </div>
  );
}

export default LikeButton;