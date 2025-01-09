import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import defPic from '../pictures/defult_user.jpg'
import ErrorNote from '../errorNote/ErrorNote.js'
import { updateUser } from '../connectToDB/usersConnectToDB.js';
import './EditUser.css'

function EditUser({ show, handleClose, myUser, updateMyUser }) {
    const [editName, setEditName] = useState("");
    const [sditImage, setEditImage] = useState(""); // State for storing base64 image
    const [errorNote, setErrorNote] = useState(null);

    useEffect(() => {
        if (myUser) {
            setEditImage(myUser.image ? myUser.image : defPic);
            setEditName(myUser.name || "");
        } else {
            myUser = sessionStorage.getItem('myUser');
            myUser = JSON.parse(myUser);
            setEditImage(myUser.image ? myUser.image : defPic);
            setEditName(myUser.name || "");

        }

    }, [myUser, show]);

    // Function to handle image file change
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {

            // Convert the image to base64
            const reader = new FileReader();
            reader.onloadend = () => {
                setEditImage(reader.result);  // Set the base64 data
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSaveChanges = async () => {
        if (!editName) {
            setErrorNote("you can't edit user without name");
            return;
        }

        if (!sditImage) {
            setEditImage(defPic);
        }
        const result = await updateUser(myUser.id, editName, sditImage);
        if (!result.success) {
            setErrorNote("problem with edit user");
            return;
        } else {
            handleCloseThisModel();
            setErrorNote(null);
            updateMyUser(result.updateUser);
        }
    };

    const handleCloseThisModel = () => {
        handleClose();
    }

    return (
        <Modal show={show} onHide={handleCloseThisModel}>
            <Modal.Header closeButton>
                <Modal.Title className='model-title'>Edit User</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form>
                    <Form.Group controlId="editName" className="mb-3">
                        <Form.Label>Change Name</Form.Label>
                        <Form.Control
                            type="text" value={editName} onChange={(e) => setEditName(e.target.value)} placeholder="Enter new name" required/>
                    </Form.Group>

                    <Form.Group controlId="formFile" className="mt-3">
                        <Form.Control type="file" accept="image/*" onChange={handleImageChange} />
                    </Form.Group>

                    {sditImage && (
                        <img src={sditImage} alt="profile preview" className='profile-image' />
                    )}
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <i className="bi bi-trash2 action-button" onClick={() => handleCloseThisModel()}></i>
                <i className="bi bi-floppy2-fill action-button" onClick={() => handleSaveChanges()}></i>
            </Modal.Footer>
            {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)} />}
        </Modal>
    );
}

export default EditUser;
