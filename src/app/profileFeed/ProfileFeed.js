import './ProfileFeed.css'
import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import NovebarFeed from '../novebarFeed/NovebarFeed.js';
import { getPostsForOneUser, getSearchPostsForOneUser } from '../connectToDB/postsConnectToDB.js';
import { stillLogin } from '../connectToDB/usersConnectToDB.js';
import friendsConnectToDB from '../connectToDB/friendsConnectToDB.js';
import ProfileCard from '../profileCard/ProfileCard.js';
import LeftMenuFeed from '../leftMenuInFeed/LeftMenuInFeed.js';
import FriendsList from '../friendsList/FriendsList.js';
import Post from '../post/Post.js';
import defaultPic from '../pictures/defult_user.jpg';
import ErrorNote from '../errorNote/ErrorNote.js';

function ProfileFeed() {
  const location = useLocation();
  const [myUser, setMyUser] = useState(location.state?.myUser || {});
  const [userProfile, setUserProfile] = useState(location.state?.userProfile || {});
  const [posts, setPosts] = useState(null);
  const [friendsList, setFriendsList] = useState(null);
  const [myFriendList, setMyFrienList] = useState(null);
  const [errorNote, setErrorNote] = useState(null);
  const [isFriend, setIsFriend] = useState(false);
  const [isMe, setIsMe] = useState(false);
  const [name, setName] = useState("");
  const [imageUrl, setImageUrl] = useState(defaultPic);

  const navigate = useNavigate();
  

  useEffect(() => {
    
    if (!userProfile || !myUser) {
      sessionStorage.getItem('myUser');
      document.body.classList.remove('dark-mode');
      navigate('/');
    } else {
      refreshPage();
      setName(userProfile.name);
      setImageUrl(userProfile.image || defaultPic);
    }
  }, [userProfile, isMe, myUser, location]);


  const refreshPage = async () => {
    const isLogin = await stillLogin();
    if (!isLogin.success) {
      sessionStorage.getItem('myUser');
      document.body.classList.remove('dark-mode');
      navigate('/');
    }

    if (!userProfile || !myUser) {
      setPosts([]);
      return;
    }
    let me = userProfile.id === myUser.id;
    let myFriend = false;

    setIsMe(me);

    if (!me) {
      const resultStatus = await friendsConnectToDB.getFriendshipStatus(myUser.id, userProfile.id);
      if (resultStatus.success) {
        myFriend = resultStatus.friendshipStatus.status === "approved";
        setIsFriend(myFriend);
      } else {
        setIsFriend(false);
      }
    }
    
    if (myFriend  || me) {
      const resultPosts = await getPostsForOneUser(userProfile.id);
      if (resultPosts.success) {
        setPosts(resultPosts.posts);
      } else {
        setErrorNote(resultPosts.message);
      }
    } else {
      setPosts([]);
    }

    const resultFriendsList = await friendsConnectToDB.getApprovedFriends(userProfile.id);
    if (resultFriendsList.success) {
      setFriendsList(resultFriendsList.approvedFriends);
    } else {
      setErrorNote(resultFriendsList.message);
    }

    const resultMyFriendsList = await friendsConnectToDB.getApprovedFriends(myUser.id);
    if (resultMyFriendsList.success) {
      setMyFrienList(resultMyFriendsList.approvedFriends);
    } else {
      setErrorNote(resultMyFriendsList.message);
    }

  }

  const handleSearch = async (text) => {
    const result = await getSearchPostsForOneUser(text, userProfile.id);
    if(result.success) {
      setPosts(result.posts);
    } else {
      setErrorNote("error with search");
    }
  }

  const handleCancelSearch = () => {
    refreshPage();
  }

  const updateMyUser = (user) => {
    sessionStorage.setItem('myUser', JSON.stringify(user));
    setMyUser(user);
    if (isMe) {
      setUserProfile(user);
    }
    refreshPage();
    
  


  }



  return (
    <div className="container text-center main-back">
      <NovebarFeed handleSearch={handleSearch} handleCancelSearch={handleCancelSearch} />
      <div className='maindiv'>
        <div className="row">
          <div className="col-12 col-lg-3 d-none d-lg-block ">
            <LeftMenuFeed MyUser={myUser} updateMyUser={updateMyUser} refreshAllPage={refreshPage} friendsList={myFriendList} setError={setErrorNote}
            obIsProfile={{isProfile: true, fun: setUserProfile}}/>
          </div>
          <div className="col-12 col-lg-6">
            {posts && (isFriend || isMe) && Array.isArray(posts)  && posts.map((post, index) => (
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
                  obIsProfile={{isProfile: true, fun: setUserProfile}}
                />
              </div>
            ))}
          </div>
          <div className="col-12 col-lg-3 d-none d-lg-block">
            <ProfileCard name={name} imageUrl={imageUrl} myUser={myUser} otherUser={userProfile} refreshPage={refreshPage}
              setErrorNote={setErrorNote} />
            <FriendsList friendsList={friendsList} myUser={myUser} setErrorNote={setErrorNote} obIsProfile={{isProfile: true, fun: setUserProfile}}/>
          </div>
        </div>
      </div>
      {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)} />}
    </div>
  );
}

export default ProfileFeed;