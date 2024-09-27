import './FeedPage.css'
import React from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import NovebarFeed from '../novebarFeed/NovebarFeed.js';
import { getNameByUsername, getProfilePicByUsername } from '../fakeDatabase/usersFakeDatabase.js';
import { getPosts } from '../fakeDatabase/postsFakeDatabase.js';
import ProfileCard from '../profileCard/ProfileCard.js';
import LeftMenuFeed from '../leftMenuInFeed/LeftMenuInFeed.js'
import UploadPost from '../uploadPost/UploadPost.js';
import Post from '../post/Post.js';




function FeedPage() {

  const location = useLocation();
  const { username } = location.state || {};

  // Redirect if userId is not found
  if (!username) {
    return <Navigate to="/" />;
  }


  const name = getNameByUsername(username);
  const imageUrl = getProfilePicByUsername(username);

  const posts = getPosts();


  return (
    <div className="container text-center">
      <NovebarFeed />
      <div className='maindiv'>
        <div className="row">
          <div className="col-12 col-lg-3 d-none d-lg-block ">
            <LeftMenuFeed />
          </div>
          <div className="col-12 col-lg-6">
            <UploadPost username={username} name={name} profilePic={imageUrl} />
            {posts.map((post, index) => (
              <div key={index} className="post-container">
                  <Post
                  realusername={username}
                  Id={post.Id}
                  username={post.username}
                  name={post.name}
                  profilePic={post.profilePic}
                  postText={post.postText}
                  postPic={post.postPic}
                  time={post.time}
                  />
              </div>
            ))}
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