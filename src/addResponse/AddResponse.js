import { Modal, Form } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import commentsConnectToDB from '../connectToDB/commentsConnectToDB.js';
import ErrorNote from '../errorNote/ErrorNote.js'
import './AddResponse.css'

function AddResponse({ show, handleClose, postId, refresh }) {
    const responseTextRef = useRef();
    const [errorNote, setErrorNote] = useState(null);

    const handleAddResponse = async () => {
        const commentText = responseTextRef.current.value;
        if (!commentText) {
            setErrorNote("text is empty");
            return;
        }
        const result = await commentsConnectToDB.createComment(postId, commentText);
        if(result.success) {
            setErrorNote(null);
            handleClose();
            refresh();
        } else {
            setErrorNote("error with create new comment");
        }
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>add comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formResponseText">
                        <Form.Label>Your Comment</Form.Label>
                        <Form.Control as="textarea" rows={5} ref={responseTextRef} placeholder="Type your comment here..." />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            <div className='button-container'>
                <i className="bi bi-trash" onClick={() => handleClose()}></i>
                <i className="bi bi-floppy" onClick={() => handleAddResponse()}></i>
            </div>
            {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)}/>}
        </Modal>
    );
}

export default AddResponse;