import {useEffect, useRef, useState} from 'react';
import './LeftMenuFeed.css'
import { deleteUser } from '../connectToDB/usersConnectToDB.js';
import FriendsListModel from '../friendsListModel/FriendsListModel';
import friendsConnectToDB from '../connectToDB/friendsConnectToDB.js';
import FriendsRequestModel from '../friendsRequestModel/FriendsRequestModel.js';
import EditUser from '../editUser/EditUser.js';
import { useNavigate } from 'react-router-dom';




function LeftMenuFeed({ myUser, updateMyUser,  refreshAllPage, friendsList, setError, obIsProfile}) {
    const [showFriendsList , setShowFriendsList] = useState(false);
    const [showFriendsRequests , setShowFriendsRequests] = useState(false);
    const [showEditUser, setShowEditUser] = useState(false);
    const [friendsRequests , setFriendsRequests] = useState(null);
    const myUserRef = useRef(myUser);
    const navigate = useNavigate();

    useEffect(() => {
        if (!myUserRef.current) {
            const storedUser = sessionStorage.getItem('myUser');
            if (storedUser) {
                myUserRef.current = JSON.parse(storedUser);
            }
        }
    }, []);

    const handleLogout = () => {
        const confirmLogout = window.confirm("you sure you want to logout?");
        if (confirmLogout) {
            document.body.classList.remove('dark-mode');
            sessionStorage.clear();
            navigate('/loading', { state: { destination: '/' } });
        }
    }
    const handleGoHome = () => {
        navigate('/feed');
    }
    const handleGoProfileFeed = () => {
        if (!obIsProfile.isProfile){
            navigate('/profilefeed', { state: {myUser: myUserRef.current, userProfile: myUserRef.current } });
        } else {
            obIsProfile.fun(myUserRef.current);
        }
    }
    const handleCloseFriendsList = () => {setShowFriendsList(false)}
    const handleGoFriendsList = () => {
        refresh();
        setShowFriendsList(true)
    }

    const handleGoFriendRequests = () => {
        refresh();
        setShowFriendsRequests(true)
    }
    const handleCloseFriendRequests = () => {setShowFriendsRequests(false)}


    const refresh = async () => {
        const result = await friendsConnectToDB.getPendingFriends();
        if (result.success) {
            setFriendsRequests(result.pendingFriends);
        } else {
            setError(result.message);
        }
        refreshAllPage();
    }

    const handleWithdeleteUser = async () => {
        const confirmLogout = window.confirm("you sure you want to delete the user?");
        if (confirmLogout) {
            const result = await deleteUser();
            if (result.success) {
                document.body.classList.remove('dark-mode');
                sessionStorage.clear();
                navigate('/loading', { state: { destination: '/' } });
            } else {
                setError(result.message)
            }
            
        }
    }

    const handleShowEditUser = () => {
        setShowEditUser(!showEditUser);
    }

    const updateMyUserInThisPage = (user) => {
        myUserRef.current = user;
        updateMyUser(user);
    }


    return (
        <div className="sidebar">
            <h5 className="menu-header">Menu</h5>
            <ul className="nav flex-column">
                <li className="nav-item" onClick={() => handleGoHome()}>
                    <button className="nav-link">
                        <i className="bi bi-house-door-fill icon"></i>
                        <span>Home</span>
                    </button>
                </li>
                <li className="nav-item" onClick={() => handleGoProfileFeed()}>
                    <button className="nav-link">
                        <i className="bi bi-person-fill icon"></i>
                        <span>Profile</span>
                    </button>
                </li>
                <li className="nav-item" onClick={() => handleGoFriendsList()}>
                    <button className="nav-link">
                        <i className="bi bi-people-fill icon"></i>
                        <span>Friends List</span>
                    </button>
                </li>
                <FriendsListModel show={showFriendsList} handleClose={handleCloseFriendsList} myUser={myUserRef.current} friendsList={friendsList} refresh={refresh}/>
                <li className="nav-item" onClick={() => handleGoFriendRequests()}>
                    <button className="nav-link">
                        <i className="bi bi-person-plus-fill icon"></i>
                        <span>Friend Requests</span>
                    </button>
                </li>
                <FriendsRequestModel show={showFriendsRequests} handleClose={handleCloseFriendRequests} myUser={myUserRef.current} friendsRequest={friendsRequests} refresh={refresh}/>
                <li className="nav-item" onClick={() => handleShowEditUser()}>
                    <button className="nav-link">
                        <i className="bi bi-person-fill-gear icon"></i>
                        <span>Edit Profile</span>
                    </button>
                </li>
                <EditUser handleClose={handleShowEditUser} myUser={myUserRef.current} show={showEditUser} updateMyUser={updateMyUserInThisPage}/>
                <li className="nav-item" onClick={() => handleWithdeleteUser()}>
                    <button className="nav-link">
                        <i className="bi bi-person-fill-dash icon"></i>
                        <span>Delete User</span>
                    </button>
                </li>
                <li className="nav-item" onClick={() => handleLogout()}>
                    <button className="nav-link">
                        <i className="bi bi-box-arrow-right icon"></i>
                        <span>Logout</span>
                    </button>
                </li>
            </ul>
        </div>
    );

}

export default LeftMenuFeed;