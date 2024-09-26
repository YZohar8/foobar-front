import './FeedPage.css'
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import NovebarFeed from '../novebarFeed/NovebarFeed.js';
import { getNameByUsername, getProfilePicByUsername } from '../fakeDatabase/usersFakeDatabase.js';
import ProfileCard from '../profileCard/ProfileCard.js';




function FeedPage() {

  const location = useLocation();
  const { username } = location.state || {};

  // Redirect if userId is not found
  if (!username) {
    return <Navigate to="/" />;
  }


  const name = getNameByUsername(username);
  const imageUrl = getProfilePicByUsername(username);


  return (
    <div className="container text-center">
      <NovebarFeed />
      <div className='maindiv'>
        <div className="row">
          <div className="col-12 col-lg-3 d-none d-lg-block">
            Column 1
          </div>
          <div className="col-12 col-lg-6">
            Column 2
          </div>
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <ProfileCard name={name} imageUrl={imageUrl} username={username} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;