import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import friendsConnectToDB from '../connectToDB/friendsConnectToDB.js';
import { getUserByUsernameOrId } from '../connectToDB/usersConnectToDB.js'
import { useNavigate } from 'react-router-dom';
import ErrorNote from '../errorNote/ErrorNote.js';
import './FriendsRequestModel.css'

function FriendsRequestModel({ show, handleClose, friendsRequest, myUser, refresh}) {
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
            navigate('/profilefeed', { state: { myUser:connectUser, userProfile } });

        }
    }

    const handleRemoveRequest =  async (userId) => {
        const result = await friendsConnectToDB.updateFriendStatus(myUser.id, userId, "not");
        if (!result.success) {
            setErrorNote("problem with remove friend request");
            return;
        }
        refresh();
    };

    const handleApproveRequest = async (userId) => {
        const result = await friendsConnectToDB.updateFriendStatus(myUser.id, userId, "approved");
        if (!result.success) {
            setErrorNote("problem with approve friend request");
            return;
        }
        refresh();
    };

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className="model-title">Friends Requests</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <ul className="suggested-users-list">
                    {friendsRequest && friendsRequest.length > 0 ? (
                        friendsRequest.map((friend, index) => (
                            <li key={index} className="suggested-user-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={friend.image}
                                        className="suggested-user-image"
                                        onClick={() => handleCLickPic(friend.id)}
                                        style={{ cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                        alt={`${friend.name}'s profile`}
                                    />
                                    <span className="suggested-user-name">{friend.name}</span>
                                </div>
                                <div className='button-inline'>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="action-button success me-2"
                                        onClick={() => handleApproveRequest(friend.id)}>
                                        <i className="bi bi-check-circle"></i>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="action-button danger"
                                        onClick={() => handleRemoveRequest(friend.id)}>
                                        <i className="bi bi-x-circle"></i>
                                    </Button>
                                </div>

                            </li>
                        ))
                    ) : (
                        <p>No friends Requests</p>
                    )}
                </ul>
            </Modal.Body>
            {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)}/>}
        </Modal>
    );
}
export default FriendsRequestModel;