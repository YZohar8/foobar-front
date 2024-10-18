import { getNameByUsername, getProfilePicByUsername } from '../fakeDatabase/usersFakeDatabase.js';
import { deleteResponseById } from '../fakeDatabase/responsesFakeDatabase.js';
import EditResponse from '../editResponse/EditResponse.js';
import React, { useState } from 'react';
import './ShowResponse.css'


function timeSince(date) {
    const seconds = Math.floor((new Date() - new Date(date)) / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);
    const months = Math.floor(days / 30);
    const years = Math.floor(months / 12);

    if (years > 0) return `${years} years ago`;
    if (months > 0) return `${months} months ago`;
    if (days > 0) return `${days} days ago`;
    if (hours > 0) return `${hours} hours ago`;
    if (minutes > 0) return `${minutes} minutes ago`;
    return `${seconds} seconds ago`;
}


function ShowResponse({ response, refresh, username }) {
    const [showModalEditResponse, setShowModalEditResponse] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const responseId = response.Id;

    const handleShowEditResponse = () => setShowModalEditResponse(true);
    const handleCloseEditResponse = () => setShowModalEditResponse(false);

    const handleDeleteResponse = (responseId) => {
        if (!deleteResponseById(responseId)) {
            // error messege
        }
        refresh();
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };



    return (
        <div key={responseId} className="response-item">
            <img src={getProfilePicByUsername(response.username)} alt={`${getNameByUsername(response.username)}'s profile`} className="response-user-image" />
            <div className="response-user-info">
                <span className="response-username">{getNameByUsername(response.username)}</span>
                <span className="response-time">{timeSince(response.time)}</span>
                <div className="response-edit">
                    {(response.username === username) &&
                        <div className="action-menu-container">
                            <i className="bi bi-three-dots action-button-small" onClick={toggleMenu}></i>
                            {isMenuOpen && (
                                <div className="action-menu">
                                    <ul>
                                        <li>
                                            <i className="bi bi-pencil" onClick={handleShowEditResponse}></i> Edit
                                        </li>
                                        <li>
                                            <i className="bi bi-trash" onClick={() => handleDeleteResponse()}></i> Delete
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    }
                </div>
                <div className="response-separator"></div>
                <p className="response-text">{response.text}</p>

                
                <EditResponse responseId={responseId} responseText={response.text} refresh={refresh}
                    handleClose={handleCloseEditResponse} show={showModalEditResponse
                    } />
            </div>
        </div>
    );
}

export default ShowResponse;