
import EditResponse from '../editResponse/EditResponse.js';
import commentsConnectToDB from '../connectToDB/commentsConnectToDB.js';
import { getUserByUsernameOrId } from '../connectToDB/usersConnectToDB.js';
import React, { useState } from 'react';
import './ShowResponse.css'
import publicFun from '../publicFun.js';
import { useNavigate } from 'react-router-dom';





function ShowResponse({obIsProfile, index, response, refresh, userId, setErrorNote}) {
    const [showModalEditResponse, setShowModalEditResponse] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();


    const handleShowEditResponse = () => setShowModalEditResponse(true);
    const handleCloseEditResponse = () => setShowModalEditResponse(false);

    const handleDeleteResponse = async () => {
        const result = await commentsConnectToDB.deleteComment(response.postId, response.id);
        if (result.success) {
            refresh();
        } else {
            setErrorNote(result.message);
        }
    }

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const handleGoToProfileFeed = async () => {
        let result = await getUserByUsernameOrId(response.author.id);
        let myUser = null;
        if (!result.success) {
            setErrorNote("problem with the move the profile feed");
        } else {
            const userProfile = result.user;

            if (obIsProfile?.isProfile) {
                obIsProfile.fun(userProfile);
                return;
            }

            result = await getUserByUsernameOrId(userId);
            if (!result.success) {
                setErrorNote("problem with the move the profile feed");
            } else {
                myUser = result.user;
            }
            navigate('/profilefeed', { state: { myUser, userProfile} });
    
        }
      }



    return (
        <div key={response.id} className="response-item">
            <img src={response.author.image} alt={`${response.author.name}'s profile`} className="response-user-image" onClick={() => handleGoToProfileFeed()} />
            <div className="response-user-info">
                <span className="response-username">{response.author.name}</span>
                <span className="response-time">{publicFun.timeSinceforComments(response.date)}</span>
                <div className="response-edit">
                    {(response.author.id === userId) &&
                        <div className="action-menu-container">
                            <i className="bi bi-three-dots action-button-small" onClick={() => toggleMenu()}></i>
                            {isMenuOpen && (
                                <div className="action-menu">
                                    <ul>
                                        <li onClick={() => handleShowEditResponse()}>
                                            <i className="bi bi-pencil" ></i> Edit
                                        </li>
                                        <li onClick={() => handleDeleteResponse(response.id)}>
                                            <i className="bi bi-trash" ></i> Delete
                                        </li>
                                    </ul>
                                </div>
                            )}
                        </div>
                    }
                </div>
                <div className="response-separator"></div>
                <p className="response-text">{response.text}</p>

                
                <EditResponse response={response} refresh={refresh} handleClose={handleCloseEditResponse} show={showModalEditResponse} />
            </div>
        </div>
    );
}

export default ShowResponse;