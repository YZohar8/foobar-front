import './FeedPage.css'
import React, {useState, useEffect} from 'react';
import { useLocation } from 'react-router-dom';
import { Navigate } from 'react-router-dom';

import NovebarFeed from '../novebarFeed/NovebarFeed.js';
import { getNameByUsername, getProfilePicByUsername } from '../fakeDatabase/usersFakeDatabase.js';
import { getPosts, getSearchPosts } from '../fakeDatabase/postsFakeDatabase.js';
import ProfileCard from '../profileCard/ProfileCard.js';
import LeftMenuFeed from '../leftMenuInFeed/LeftMenuInFeed.js'
import UploadPost from '../uploadPost/UploadPost.js';
import Post from '../post/Post.js';
import defaultPic from '../pictures/defult_user.jpg'




function FeedPage() {

  const location = useLocation();
  const { username } = location.state || {};
  const [posts, setPosts] = useState(null);
  const [redirect, setRedirect] = useState(false); // State to handle redirection

  useEffect(() => {
    if (!username) {
      setRedirect(true); 
    } else {
      setPosts(getPosts());
    }
  }, [username]); 
  if (redirect) {
    return <Navigate to="/" />; 
  }

const refreshPost = () => {
  setPosts(getPosts());
}

  const handleSearch = (text) => {
    const listpost = getSearchPosts(text);
    setPosts(listpost);
  } 

  const handleCancelSearch = () => {
      refreshPost();
  }



  const name = getNameByUsername(username);
  const imageUrl = getProfilePicByUsername(username) || defaultPic;



  return (
    <div className="container text-center">
      <NovebarFeed handleSearch={handleSearch} handleCancelSearch={handleCancelSearch}/>
      <div className='maindiv'>
        <div className="row">
          <div className="col-12 col-lg-3 d-none d-lg-block ">
            <LeftMenuFeed />
          </div>
          <div className="col-12 col-lg-6">
            <UploadPost username={username} name={name} profilePic={imageUrl} whenAddPost={refreshPost}/>
            {posts && posts.map((post, index) => (
              <div key={index} className="post-container">
                  <Post
                  realusername={username}
                  Id={post.Id}
                  username={post.username}
                  name={getNameByUsername(post.username)}
                  profilePic={getProfilePicByUsername(post.username)}
                  postText={post.postText}
                  postPic={post.postPic}
                  time={post.time}
                  />
              </div>
            ))}
          </div>
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <ProfileCard name={name} imageUrl={imageUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;