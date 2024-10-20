import React, { useState } from 'react';
import { Modal, Button } from 'react-bootstrap';
import { getNameByUsername, getProfilePicByUsername, deleteFriendFromfriendsList } from '../fakeDatabase/usersFakeDatabase.js'
import { useNavigate } from 'react-router-dom';
import ErrorNote from '../errorNote/ErrorNote.js';

function FriendsListModel({ show, handleClose, friendsList, myUsername, refresh }) {
    const [errorNote , setErrorNote] = useState(null);
    const navigate = useNavigate();



    const handleCLickPic = (username) => {
        navigate('/profilefeed', { state: {realUsername:myUsername, username } });
    }

    const handleRemoveFriend = (username) => {
        if (!deleteFriendFromfriendsList(myUsername, username)) {
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
                    {friendsList.length > 0 ? (
                        friendsList.map((username, index) => (
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
                                <Button
                                    variant="danger"
                                    size="sm"
                                    className="action-button danger"
                                    onClick={() => handleRemoveFriend(username)}>
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