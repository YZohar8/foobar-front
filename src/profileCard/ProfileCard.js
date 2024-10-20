import React from 'react';
import './ProfileCard.css';
import defaultPic from '../pictures/defult_user.jpg'
import { isAlreadyFriend, isAlreadyinRequestsList, addRequestsTofriendsRequests, deleteFriendFromfriendsList, deleteRequestsFromfriendsRequests } from '../fakeDatabase/usersFakeDatabase.js'

function ProfileCard({ name, imageUrl, realUsername, username, refreshPage, setErrorNote }) {
  let isMe = realUsername === username;
  let isFriend = isAlreadyFriend(realUsername, username) && !isMe;
  let iSentHimRequest = isAlreadyinRequestsList(realUsername, username) && !isMe;
  let isNotFriend = !isMe && !iSentHimRequest && !isFriend;
 

  const handleAddRequest = () => {
    if (!addRequestsTofriendsRequests(realUsername, username)) {
      setErrorNote("problem with sent friend request");
      return;
    }
    refreshPage();
    handleChanges();
  }

  const handleDeleteRequest = () => {
    if (!deleteRequestsFromfriendsRequests(realUsername, username)) {
      setErrorNote("problem with cancel friends request");
      return;
    }
    refreshPage();
    handleChanges();
  }

  const handleDeleteFriend = () => {
    if (!deleteFriendFromfriendsList(realUsername, username)) {
      setErrorNote("problem with delete friend");
      return;
    }
    refreshPage();
    handleChanges();
  }

  const handleChanges = () => {
    isMe = realUsername === username;
    isFriend = isAlreadyFriend(realUsername, username) && !isMe;
    iSentHimRequest = isAlreadyinRequestsList(realUsername, username) && !isMe;
    isNotFriend = !isMe && !iSentHimRequest && !isFriend;
    console.log(username);
    console.log(iSentHimRequest);


  }


  return (
    <div className="profile-card text-center">
      <img
        src={imageUrl || defaultPic} // If imageUrl is not provided, use defaultPic
        alt={name}
        className="rounded-image"
        style={{ width: '200px', height: '200px', borderRadius: '50%' }}
      />
      <h3 className="person-name">{name}</h3>
      <div>
        {isMe && (
          <button type="button" className="btn custom-btn neutral">
            <i className="bi bi-person-circle"></i> welcome!!
          </button>
        )}
        {isFriend && (
          <button type="button" className="btn custom-btn danger" onClick={() => handleDeleteFriend()}>
            <i className="bi bi-x-circle"></i> Cancel Friendship
          </button>
        )}
        {iSentHimRequest && (
          <button type="button" className="btn custom-btn warning" onClick={() => handleDeleteRequest()}>
            <i className="bi bi-clock-history"></i> Cancel Friend Request
          </button>
        )}
        {isNotFriend && (
          <button type="button" className="btn custom-btn success" onClick={() => handleAddRequest()}>
            <i className="bi bi-person-plus"></i> Send Friend Request
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;