import React from 'react';
import './ProfileCard.css';
import defaultPic from '../pictures/defult_user.jpg'

function ProfileCard({ name, imageUrl}) {


  return (
    <div className="profile-card text-center">
      <img
        src={imageUrl || defaultPic} // If imageUrl is not provided, use defaultPic
        alt={name}
        className="rounded-image"
        style={{ width: '200px', height: '200px', borderRadius: '50%' }}
      />
      <h3 className="person-name">{name}</h3>
    </div>
  );
}

export default ProfileCard;