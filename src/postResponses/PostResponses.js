import { Modal } from 'react-bootstrap';
import React, { useEffect, useState } from 'react';
import { getResponsesById} from '../fakeDatabase/responsesFakeDatabase.js';
import AddResponse from '../addResponse/AddResponse.js';
import ShowResponse from '../showResponse/ShowResponse.js';
import './PostResponses.css';


function PostResponses({ show, handleClose, postId, username }) {
    const [responses, setResponses] = useState([]);
    const [showModalAddResponse, setShowModalAddResponse] = useState(false);

    const handleShowAddResponse = () => setShowModalAddResponse(true);
    const handleCloseAddResponse = () => setShowModalAddResponse(false);

    const refreshResponses = () => {
        const fetchedResponses = getResponsesById(postId);
        setResponses(fetchedResponses);
    }

    useEffect(() => {
        if (show) {
            refreshResponses();
        }
    }, [show, postId]);



    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>responses</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="responses-container">
                    {responses.map((response, index) => (
                        <ShowResponse response={response} refresh={refreshResponses} username={username}/>
                    ))}
                </div>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            <i className="bi bi-plus" onClick={handleShowAddResponse}></i>
            <AddResponse show={showModalAddResponse} handleClose={handleCloseAddResponse} postId={postId} username={username} refresh={refreshResponses} />
        </Modal>
    );
}

export default PostResponses;