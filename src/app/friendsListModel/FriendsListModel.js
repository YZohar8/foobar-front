import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import friendsConnectToDB from '../connectToDB/friendsConnectToDB.js';
import { getUserByUsernameOrId } from '../connectToDB/usersConnectToDB.js'
import { useNavigate } from 'react-router-dom';
import ErrorNote from '../errorNote/ErrorNote.js';

function FriendsListModel({ show, handleClose, friendsList, myUser, refresh }) {
    const [errorNote , setErrorNote] = useState(null);
    const navigate = useNavigate();



    const handleCLickPic = async (userId) => {
        let connectUser = sessionStorage.getItem('myUser');
        if(!connectUser) {
            return;
        }
        connectUser = JSON.parse(connectUser);
        const result = await getUserByUsernameOrId(userId);
        if (!result.success) {
            setErrorNote("problem with the move the profile feed");
        } else {
            const userProfile = result.user;
            handleClose();
            navigate('/profilefeed', { state: { myUser: connectUser, userProfile } });

        }
    }

    const handleRemoveFriend = async (userId) => {
        const result = await friendsConnectToDB.updateFriendStatus(myUser.id, userId, "not");
        if (!result.success) {
            setErrorNote("problem with delete friend");
            return;
        }
        refresh();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="model-title">Friends List</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="suggested-users-list">
                    {friendsList && friendsList.length > 0 ? (
                        friendsList.map((friend, index) => (
                            <li key={index} className="suggested-user-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={friend.image}
                                        className="suggested-user-image"
                                        onClick={() => handleCLickPic(friend.id)}
                                        style={{ cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                        alt={`${friend.id}'s profile`}
                                    />
                                    <span className="suggested-user-name">{friend.name}</span>
                                </div>
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="action-button danger"
                                    onClick={() => handleRemoveFriend(friend.id)}>
                                    <i className="bi bi-x-circle"></i>
                                </Button>
                            </li>
                        ))
                    ) : (
                        <p>No friends available</p>
                    )}
                </ul>
            </Modal.Body>
            {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)}/>}
        </Modal>
    );
}
export default FriendsListModel;