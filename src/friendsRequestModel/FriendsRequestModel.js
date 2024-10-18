import React from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getNameByUsername, getProfilePicByUsername, deleteRequestsFromfriendsRequests, addFriendTofriendsList } from '../fakeDatabase/usersFakeDatabase.js'
import { useNavigate } from 'react-router-dom';
import './FriendsRequestModel.css'

function FriendsRequestModel({ show, handleClose, friendsRequest, myUsername, refresh }) {
    const navigate = useNavigate();

    const handleCLickPic = (username) => {
        navigate('/profilefeed', { state: { realUsername: myUsername, username } });
    }

    const handleRemoveRequest = (username) => {
        if (!deleteRequestsFromfriendsRequests(myUsername, username)) {
            // error messege
        }
        refresh();
    };

    const handleApproveRequest = (username) => {
        if (!addFriendTofriendsList(myUsername, username)) {
            // error messege
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
                    {friendsRequest.length > 0 ? (
                        friendsRequest.map((username, index) => (
                            <li key={index} className="suggested-user-item d-flex justify-content-between align-items-center">
                                <div className="d-flex align-items-center">
                                    <img
                                        src={getProfilePicByUsername(username)}
                                        className="suggested-user-image"
                                        onClick={() => handleCLickPic(username)}
                                        style={{ cursor: 'pointer', width: '40px', height: '40px', borderRadius: '50%', marginRight: '10px' }}
                                        alt={`${getNameByUsername(username)}'s profile`}
                                    />
                                    <span className="suggested-user-name">{getNameByUsername(username)}</span>
                                </div>
                                <div className='button-inline'>
                                    <Button
                                        variant="success"
                                        size="sm"
                                        className="action-button success me-2"
                                        onClick={() => handleApproveRequest(username)}>
                                        <i className="bi bi-check-circle"></i>
                                    </Button>
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        className="action-button danger"
                                        onClick={() => handleRemoveRequest(username)}>
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
        </Modal>
    );
}
export default FriendsRequestModel;