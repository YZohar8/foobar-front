import { useState } from 'react';
import './LeftMenuFeed.css'
import { useNavigate } from 'react-router-dom';
import FriendsListModel from '../friendsListModel/FriendsListModel';
import { getfriendsList, getfriendsRequests} from '../fakeDatabase/usersFakeDatabase.js'
import FriendsRequestModel from '../friendsRequestModel/FriendsRequestModel.js';



function LeftMenuFeed({ username, refreshAllPage }) {
    const [showFriendsList , setShowFriendsList] = useState(false);
    const [friendsList , setFriendsList] = useState(getfriendsList(username));
    const [showFriendsRequests , setShowFriendsRequests] = useState(false);
    const [friendsRequests , setFriendsRequests] = useState(getfriendsRequests(username));

    const navigate = useNavigate();

    const handleLogout = () => {
        document.body.classList.remove('dark-mode');
        navigate('/loading', { state: { destination: '/' } });
    }
    const handleGoHome = () => {
        navigate('/feed', { state: { username: username } });
    }
    const handleGoProfileFeed = () => {
        navigate('/profilefeed', { state: { realUsername: username, username: username } });
    }
    const handleCloseFriendsList = () => {setShowFriendsList(false)}
    const handleGoFriendsList = () => {setShowFriendsList(true)}

    const handleGoFriendRequests = () => {setShowFriendsRequests(true)}
    const handleCloseFriendRequests = () => {setShowFriendsRequests(false)}


    const refresh = () => {
        setFriendsList(getfriendsList(username));
        setFriendsRequests(getfriendsRequests(username));
        refreshAllPage();
    }


    return (
        <div className="sidebar">
            <h5 className="menu-header">Menu</h5>
            <ul className="nav flex-column">
                <li className="nav-item" onClick={() => handleGoHome()}>
                    <a className="nav-link">
                        <i className="bi bi-house-door-fill icon"></i>
                        <span>Home</span>
                    </a>
                </li>
                <li className="nav-item" onClick={() => handleGoProfileFeed()}>
                    <a className="nav-link">
                        <i className="bi bi-person-fill icon"></i>
                        <span>Profile</span>
                    </a>
                </li>
                <li className="nav-item" onClick={() => handleGoFriendsList()}>
                    <a className="nav-link">
                        <i className="bi bi-people-fill icon"></i>
                        <span>Friends List</span>
                    </a>
                </li>
                <FriendsListModel show={showFriendsList} handleClose={handleCloseFriendsList} myUsername={username} friendsList={friendsList} refresh={refresh}/>
                <li className="nav-item" onClick={() => handleGoFriendRequests()}>
                    <a className="nav-link">
                        <i className="bi bi-person-plus-fill icon"></i>
                        <span>Friend Requests</span>
                    </a>
                </li>
                <FriendsRequestModel show={showFriendsRequests} handleClose={handleCloseFriendRequests} myUsername={username} friendsRequest={friendsRequests} refresh={refresh}/>
                <li className="nav-item">
                    <a className="nav-link">
                        <i class="bi bi-shop-window icon"></i>
                        <span>Marketplace</span>
                    </a>
                </li>
                <li className="nav-item">
                    <a className="nav-link">
                        <i className="bi bi-gear-fill icon"></i>
                        <span>Settings</span>
                    </a>
                </li>
                <li className="nav-item" on onClick={() => handleLogout()}>
                    <a className="nav-link">
                        <i className="bi bi-box-arrow-right icon"></i>
                        <span>Logout</span>
                    </a>
                </li>
            </ul>
        </div>
    );

}

export default LeftMenuFeed;