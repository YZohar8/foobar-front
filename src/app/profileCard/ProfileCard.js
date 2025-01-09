import React, { useEffect, useState } from 'react';
import './ProfileCard.css';
import defaultPic from '../pictures/defult_user.jpg'
import friendsConnectToDB from '../connectToDB/friendsConnectToDB.js';

function ProfileCard({ name, imageUrl, myUser, otherUser, refreshPage, setErrorNote }) {
  const [isMe, setIsMe] = useState(false);
  const [isFriend, setIsFriend] = useState(false);
  const [iSentHimRequest, setISentHimRequest] = useState(false);
  const [isNotFriend, setIsNotFriend] = useState(false);
  const [reciveRequest, setReciveRequest] = useState(false);

  
  useEffect(() => {
    setIsMe(false);
    setIsFriend(false);
    setISentHimRequest(false);
    setIsNotFriend(false);
    setReciveRequest(false);

    checkFriendsStatus();
  }, [myUser, otherUser]);

  const handleAddRequest = async () => {
    const result = await friendsConnectToDB.updateFriendStatus(myUser.id, otherUser.id, "pending");
    if (!result.success) {
      setErrorNote(result.message);
      return;
    }
    handleChanges();
  }

  const handleDeleteRequest = async () => {
    const result = await friendsConnectToDB.updateFriendStatus(myUser.id, otherUser.id, "not");
    if (!result.success) {
      setErrorNote(result.message);
      return;
    }
    handleChanges();
  }

  const handleDeleteFriend = async () => {
    const result = await friendsConnectToDB.updateFriendStatus(myUser.id, otherUser.id, "not");
    if (!result.success) {
      setErrorNote(result.message);
      return;
    }
    handleChanges();
  }

  const handleapproveFriend = async () => {
    const result = await friendsConnectToDB.updateFriendStatus(myUser.id, otherUser.id, "approved");
    if (!result.success) {
      setErrorNote(result.message);
      return;
    }
    handleChanges();
  }

  const checkFriendsStatus = async () => {
    if (!myUser || !otherUser) {
      return;
    }
    const me = myUser.email === otherUser.email

    setIsMe(me);
    setIsFriend(false);
    setISentHimRequest(false);
    setIsNotFriend(false);
    setReciveRequest(false);


    if (!me) {
      const result = await friendsConnectToDB.getFriendshipStatus(myUser.id, otherUser.id);
      if(result.success) {
        if (result.friendshipStatus.status === "approved") {
          setIsFriend(true);

        } else if (result.friendshipStatus.status ==="s-pending") {
          setISentHimRequest(true);

        } else if (result.friendshipStatus.status ==="pending") {
          setReciveRequest(true);

        } else {
          setIsNotFriend(true);
        }
      } else {
        setErrorNote(result.message);
      }
    }
  };
  const handleChanges = async () => {
    await checkFriendsStatus();
    await refreshPage();
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
        {reciveRequest && (
          <button type="button" className="btn custom-btn success" onClick={() => handleapproveFriend()}>
            <i className="bi bi-check-circle"></i> aprrove friend
          </button>
        )}
      </div>
    </div>
  );
}

export default ProfileCard;