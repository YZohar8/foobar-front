import './FriendsList.css'
import React from 'react';
import { getUserByUsernameOrId } from '../connectToDB/usersConnectToDB.js'
import { useNavigate } from 'react-router-dom';


function FriendsList({ friendsList, myUser, setErrorNote, obIsProfile }) {
    const navigate = useNavigate();

    const handleCLickPic = async (userId) => {
        const result = await getUserByUsernameOrId(userId);

        if (!result.success) {
            setErrorNote("problem with the move the profile feed");
        } else {
            const userProfile = result.user;
            if (obIsProfile.isProfile) {
                obIsProfile.fun(userProfile);
            } else {
                navigate('/profilefeed', { state: { myUser, userProfile } });
            }

        }
    }

    if (!friendsList || friendsList.length === 0) {
        return <div className="suggested-users-container"><p>No friends available</p></div>;
    }
    
    return (
        <div className="suggested-users-container">
            <h5>friends list</h5>
            <ul className="suggested-users-list">
                {friendsList.slice(0, 4).map((friend, index) => (
                    <li key={index} className="suggested-user-item">
                        <img src={friend.image} alt={friend.name} className="suggested-user-image" onClick={() => handleCLickPic(friend.id)}/>
                        <span className="suggested-user-name">{friend.name}</span>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default FriendsList;