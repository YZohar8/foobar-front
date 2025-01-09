import './FeedPage.css'
import React, { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

import NovebarFeed from '../novebarFeed/NovebarFeed.js'
import friendsConnectToDB from '../connectToDB/friendsConnectToDB.js'
import { stillLogin} from '../connectToDB/usersConnectToDB.js'
import { getPosts, getSearchPosts } from '../connectToDB/postsConnectToDB.js'
import ProfileCard from '../profileCard/ProfileCard.js'
import LeftMenuFeed from '../leftMenuInFeed/LeftMenuInFeed.js'
import UploadPost from '../uploadPost/UploadPost.js'
import Post from '../post/Post.js'
import defaultPic from '../pictures/defult_user.jpg'
import FriendsList from '../friendsList/FriendsList.js'
import ErrorNote from '../errorNote/ErrorNote.js'
import './FeedPage.css'





function FeedPage() {
  const [myUser, setMyUser] = useState(null);
  const [posts, setPosts] = useState(null);
  const [friendsList, setFriendsList] = useState(null)
  const [errorNote, setErrorNote] = useState(null);
  const navigate = useNavigate();


  useEffect(() => {
    const checkConnect = async () => {
        let connectUser = sessionStorage.getItem('myUser');
        let myuserId = sessionStorage.getItem('myUserId')

        if (!connectUser || !myuserId) {
            document.body.classList.remove('dark-mode');
            sessionStorage.removeItem('myUserId');
            navigate('/');

        } else {
          const result = await stillLogin();

          if (!result.success) {
            sessionStorage.getItem('myUser');
            document.body.classList.remove('dark-mode');
            navigate('/');
          } else {
            connectUser = JSON.parse(connectUser);
            setMyUser(connectUser);
          }
        }
    }
    checkConnect();
}, [navigate]);

useEffect(() => {
  refreshPage();
}, [myUser])

  const refreshPage = async () => {
    const isLogin = await stillLogin();
    if (!isLogin.success) {
      sessionStorage.getItem('myUser');
      document.body.classList.remove('dark-mode');
      navigate('/');
    }
    
    if (!myUser) {
      return;
    }

    const result = await getPosts(myUser.id);
    if (result.success) {
      setPosts(result.posts);
    } else {
      setPosts([]);
      setErrorNote(result.message);
    }
    if (myUser && myUser.id) {
      const resultFriendsList = await friendsConnectToDB.getApprovedFriends(myUser.id);
      if (resultFriendsList.success) {
        setFriendsList(resultFriendsList.approvedFriends);
      } else {
        setErrorNote(resultFriendsList.message);
      }
    }
  }
  
  const updateMyUser = (user) => {
    setMyUser(user);
    sessionStorage.setItem('myUser', JSON.stringify(user));
    refreshPage();
  }


  const handleSearch = async (text) => {
    const result = await getSearchPosts(text, myUser.id);
    if (result.success) {
      setPosts(result.posts);
    } else {
      setErrorNote("error with search");
    }
    
  }

  const handleCancelSearch = () => {
    refreshPage();
  }


const name = myUser ? myUser.name : '';
const imageUrl = myUser && myUser.image ? myUser.image : defaultPic;


  return (
    <div className="container text-center main-back">
      <NovebarFeed handleSearch={handleSearch} handleCancelSearch={handleCancelSearch} />
      <div className='maindiv'>
        <div className="row">
          <div className="col-12 col-lg-3 d-none d-lg-block ">
            <LeftMenuFeed MyUser={myUser} refreshAllPage={refreshPage} friendsList={friendsList} setError={setErrorNote} updateMyUser={updateMyUser}/>
          </div>
          <div className="col-12 col-lg-6">
            <UploadPost myUser={myUser} name={name} profilePic={imageUrl} whenAddPost={refreshPage} setErrorNote={setErrorNote}/>
            {posts && Array.isArray(posts) && posts.map((post, index) => (
              <div key={index} className="post-container">
                <Post 
                  myUser={myUser}
                  Id={post.id}
                  authorId={post.author.id}
                  name={post.author.name}
                  profilePic={post.author.image}
                  postText={post.text}
                  postPic={post.image}
                  time={post.date}
                  refreshPosts={refreshPage}
                  setError={setErrorNote}
                  post={post}
                  likesCounter={post.likesCounter}
                  commentsCounter={post.commentsCounter}
                  obIsProfile={{isProfile: false}}
                />
              </div>
            ))}
          </div>
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <ProfileCard name={name} imageUrl={imageUrl} myUser={myUser} otherUser={myUser} refreshPage={refreshPage}
            setErrorNote={setErrorNote}/>
            <FriendsList friendsList={friendsList} myUser={myUser} setErrorNote={setErrorNote} obIsProfile={{isProfile: false}}/>
          </div>
        </div>
      </div>
      {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)}/>}
    </div>
  );
}

export default FeedPage;