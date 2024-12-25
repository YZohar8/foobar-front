import { Modal, Form } from 'react-bootstrap';
import React, {  useState } from 'react';
import commentsConnectToDB from '../connectToDB/commentsConnectToDB.js';
import ErrorNote from '../errorNote/ErrorNote.js'

function EditResponse({ response, refresh, handleClose, show }) {

    const [responseEditText, setResponseEditText] = useState(response.text);
    const [errorNote, setErrorNote] = useState(null);

    const handleEditResponse = async () => {
        if (!responseEditText || responseEditText === "") {
            setErrorNote("you can't edit response witout text");
            return;
        }

        const result = await commentsConnectToDB.updateComment(response.postId, response.id, responseEditText);
        if (result.success) {
            setErrorNote(null);
            handleClose();
            refresh();
        } else {
            setErrorNote(result.message);
        }
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='model-title'>edit comment</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formResponseText">
                        <Form.Label>Your Comment</Form.Label>
                        <Form.Control as="textarea" rows={5} value={responseEditText} onChange={(e) => setResponseEditText(e.target.value)} required/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            <div className='button-container'>
                <i class="bi bi-trash" onClick={handleClose}></i>
                <i class="bi bi-floppy" onClick={() => handleEditResponse()}></i>
            </div>
            {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)} />}
        </Modal>
    );
}

export default EditResponse;