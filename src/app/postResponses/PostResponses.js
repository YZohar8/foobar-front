import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import commentsConnectToDB from '../connectToDB/commentsConnectToDB.js';
import AddResponse from '../addResponse/AddResponse.js';
import ShowResponse from '../showResponse/ShowResponse.js';
import ErrorNote from '../errorNote/ErrorNote.js';
import './PostResponses.css';


function PostResponses({ show, handleClose, postId, userId, obIsProfile }) {
    const [responses, setResponses] = useState([]);
    const [showModalAddResponse, setShowModalAddResponse] = useState(false);
    const [errorNote, setErrorNote] = useState(null);

    const handleShowAddResponse = () => setShowModalAddResponse(true);
    const handleCloseAddResponse = () => setShowModalAddResponse(false);

    const refreshResponses = async () => {
        const result = await commentsConnectToDB.getComments(postId);
        if (result.success) {
            setResponses(result.comments);
        }
        else {
            setErrorNote(result.message);
        }
    }

    useEffect(() => {
        if (show) {
            refreshResponses();
        }
    }, [show, postId]);



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='model-title'>Comments</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="responses-container">
                    {responses.map((response, index) => (
                        <ShowResponse index={index} response={response} refresh={refreshResponses} userId={userId} setErrorNote={setErrorNote}
                        obIsProfile={obIsProfile}/>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            <i className="bi bi-plus" onClick={handleShowAddResponse}></i>
            <AddResponse show={showModalAddResponse} handleClose={handleCloseAddResponse} postId={postId} refresh={refreshResponses} userId={userId}/>
            {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)}/>}
        </Modal>
    );
}

export default PostResponses;