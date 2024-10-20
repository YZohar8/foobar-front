import { Modal, Form } from 'react-bootstrap';
import React, { useRef, useState } from 'react';
import { getNextResponseId, addResponse } from '../fakeDatabase/responsesFakeDatabase';
import ErrorNote from '../errorNote/ErrorNote.js'
import './AddResponse.css'

function AddResponse({ show, handleClose, postId, username, refresh }) {
    const responseTextRef = useRef();
    const [errorNote, setErrorNote] = useState(null);

    const handleAddResponse = () => {
        const responseText = responseTextRef.current.value;
        if (responseText) {
            const newResponse = {
                Id: getNextResponseId(),
                text: responseText,
                username,
                postId,
                time: new Date().getTime(),
                active: true
            };
            if (!addResponse(newResponse)) {
                setErrorNote("problem in create new response");
                return;
            }
        } else {
            setErrorNote("you can't add response witout text");
            return;
        }
        setErrorNote(null);
        handleClose();
        refresh();
    }


    return (
        <Modal show={show} onHide={handleClose}>
            <Modal.Header closeButton>
                <Modal.Title>add response</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="formResponseText">
                        <Form.Label>Your Response</Form.Label>
                        <Form.Control as="textarea" rows={5} ref={responseTextRef} placeholder="Type your response here..." />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
            </Modal.Footer>
            <div className='button-container'>
                <i class="bi bi-trash" onClick={handleClose}></i>
                <i class="bi bi-floppy" onClick={handleAddResponse}></i>
            </div>
            {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)}/>}
        </Modal>
    );
}

export default AddResponse;