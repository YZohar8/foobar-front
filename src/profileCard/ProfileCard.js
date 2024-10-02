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
        style={{ width: '150px', height: '150px', borderRadius: '50%' }}
      />
      <h3 className="person-name">{name}</h3>
      <button className="btn btn-primary">View Profile</button>
    </div>
  );
}

export default ProfileCard;