import './ProfileFeed.css'
import React, {useState, useEffect} from 'react';
import { useLocation, useNavigate } from 'react-router-dom';

import NovebarFeed from '../novebarFeed/NovebarFeed.js';
import { getNameByUsername, getProfilePicByUsername, checkUserByUsername, getfriendsList } from '../fakeDatabase/usersFakeDatabase.js';
import { getPostsForOneUser, getSearchPostsForOneUser } from '../fakeDatabase/postsFakeDatabase.js';
import ProfileCard from '../profileCard/ProfileCard.js';
import LeftMenuFeed from '../leftMenuInFeed/LeftMenuInFeed.js'
import FriendsList from '../friendsList/FriendsList.js';
import Post from '../post/Post.js';
import defaultPic from '../pictures/defult_user.jpg'

function ProfileFeed () {
    const location = useLocation();
    const { realUsername, username } = location.state || {};
    const [posts, setPosts] = useState(null);
    const [friendsList, setFriendsList] = useState(null);

    const navigate = useNavigate();
  
    useEffect(() => {
      if (!realUsername) {
        navigate('/'); 
      } else {
        if (!checkUserByUsername(realUsername)) {
          navigate('/');
        }
        refreshPage();
      }
    }, [realUsername, username]);
  
  
  const refreshPage = () => {
    setPosts(getPostsForOneUser(username));
    setFriendsList(getfriendsList(username));
  }
  
    const handleSearch = (text) => {
      const listpost = getSearchPostsForOneUser(text, username);
      setPosts(listpost);
    } 
  
    const handleCancelSearch = () => {
        refreshPage();
    }
  
  
    const name = getNameByUsername(username);
    const imageUrl = getProfilePicByUsername(username) || defaultPic;
  
  
  
    return (
      <div className="container text-center main-back">
        <NovebarFeed handleSearch={handleSearch} handleCancelSearch={handleCancelSearch}/>
        <div className='maindiv'>
          <div className="row">
            <div className="col-12 col-lg-3 d-none d-lg-block ">
              <LeftMenuFeed username={realUsername} refreshAllPage={refreshPage}/>
            </div>
            <div className="col-12 col-lg-6">
              {posts && posts.map((post, index) => (
                <div key={index} className="post-container">
                    <Post
                    realusername={realUsername}
                    Id={post.Id}
                    username={post.username}
                    name={getNameByUsername(post.username)}
                    profilePic={getProfilePicByUsername(post.username)}
                    postText={post.postText}
                    postPic={post.postPic}
                    time={post.time}
                    refreshPosts={refreshPage}
                    postPicFile={post.postPicFile}
                    />
                </div>
              ))}
            </div>
            <div className="col-12 col-lg-3 d-none d-lg-block">
              <ProfileCard name={name} imageUrl={imageUrl} realUsername={realUsername} username={username} refreshPage={refreshPage}/>
              <FriendsList friendsList={friendsList} realUsername={realUsername}/>
            </div>
          </div>
        </div>
      </div>
    );
  }

export default ProfileFeed;