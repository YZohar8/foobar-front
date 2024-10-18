import './FeedPage.css'
import React, { useState, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'

import NovebarFeed from '../novebarFeed/NovebarFeed.js'
import { getNameByUsername, getProfilePicByUsername, checkUserByUsername, getfriendsList} from '../fakeDatabase/usersFakeDatabase.js'
import { getPosts, getSearchPosts } from '../fakeDatabase/postsFakeDatabase.js'
import ProfileCard from '../profileCard/ProfileCard.js'
import LeftMenuFeed from '../leftMenuInFeed/LeftMenuInFeed.js'
import UploadPost from '../uploadPost/UploadPost.js'
import Post from '../post/Post.js'
import defaultPic from '../pictures/defult_user.jpg'
import FriendsList from '../friendsList/FriendsList.js'
import './FeedPage.css'





function FeedPage() {

  const location = useLocation();
  const { username } = location.state || {};
  const [posts, setPosts] = useState(null);
  const [friendsList, setFriendsList] = useState(null)
  const navigate = useNavigate();


  useEffect(() => {
    if (!username) {
      document.body.classList.remove('dark-mode');
      navigate('/');
    } else {
      if (!checkUserByUsername(username)) {
        document.body.classList.remove('dark-mode');
        navigate('/');
      }
      refreshPage();
    }
  }, [username]);


  const refreshPage = () => {
    setPosts(getPosts());
    setFriendsList(getfriendsList(username));

  }


  const handleSearch = (text) => {
    const listpost = getSearchPosts(text);
    setPosts(listpost);
  }

  const handleCancelSearch = () => {
    refreshPage();
  }


  const name = getNameByUsername(username);
  const imageUrl = getProfilePicByUsername(username) || defaultPic;



  return (
    <div className="container text-center main-back">
      <NovebarFeed handleSearch={handleSearch} handleCancelSearch={handleCancelSearch} />
      <div className='maindiv'>
        <div className="row">
          <div className="col-12 col-lg-3 d-none d-lg-block ">
            <LeftMenuFeed username={username} refreshAllPage={refreshPage}/>
          </div>
          <div className="col-12 col-lg-6">
            <UploadPost username={username} name={name} profilePic={imageUrl} whenAddPost={refreshPage} />
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
                  refreshPosts={refreshPage}
                  postPicFile={post.postPicFile}
                />
              </div>
            ))}
          </div>
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <ProfileCard name={name} imageUrl={imageUrl} realUsername={username} username={username} refreshPage={refreshPage}/>
            <FriendsList friendsList={friendsList} realUsername={username}/>
          </div>
        </div>
      </div>
    </div>
  );
}

export default FeedPage;