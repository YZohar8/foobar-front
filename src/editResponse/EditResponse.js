import { Modal, Form } from 'react-bootstrap';
import React, {  useState } from 'react';
import { updateResponseById } from '../fakeDatabase/responsesFakeDatabase';

function EditResponse({ responseId, responseText, refresh, handleClose, show }) {

    const [responseEditText, setResponseEditText] = useState(responseText);

    const handleEditResponse = () => {
        if (responseEditText) {
            if (!updateResponseById(responseId, responseEditText)) {
                // error messege
            }
        } else {
            // error messege
        }
        handleClose();
        refresh();
    }

    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title className='model-title'>edit response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formResponseText">
                        <Form.Label>Your Response</Form.Label>
                        <Form.Control as="textarea" rows={5} value={responseEditText} onChange={(e) => setResponseEditText(e.target.value)} required/>
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            <div className='button-container'>
                <i class="bi bi-trash" onClick={handleClose}></i>
                <i class="bi bi-floppy" onClick={handleEditResponse}></i>
            </div>

        </Modal>
    );
}

export default EditResponse;