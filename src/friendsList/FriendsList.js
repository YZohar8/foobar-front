import './FriendsList.css'
import React from 'react';
import { getProfilePicByUsername, getNameByUsername } from '../fakeDatabase/usersFakeDatabase.js'
import { useNavigate } from 'react-router-dom';


function FriendsList({ friendsList, realUsername }) {
    const navigate = useNavigate();

    const handleCLickPic = (username) => {
        navigate('/profilefeed', {state:{realUsername, username}});
    }

    if (!friendsList || friendsList.length === 0) {
        return <div className="suggested-users-container"><p>No friends available</p></div>;
    }
    
    return (
        <div className="suggested-users-container">
            <h5>friends list</h5>
            <ul className="suggested-users-list">
                {friendsList.slice(0, 4).map((username, index) => (
                    <li key={index} className="suggested-user-item">
                        <img src={getProfilePicByUsername(username)} className="suggested-user-image" onClick={() => handleCLickPic(username)}/>
                        <span className="suggested-user-name">{getNameByUsername(username)}</span>
                    {console.log(getNameByUsername(username))}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FriendsList;