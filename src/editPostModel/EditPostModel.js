import { updatePost } from '../connectToDB/postsConnectToDB.js'
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import ErrorNote from '../errorNote/ErrorNote.js'
import './EditPostModel.css'

function EditPostModel({ show, handleClose, Id, postText, postPic, refreshPosts }) {
  const [editPostText, setEditPostText] = useState("");
  const [editPostPicBase64, setEditPostPicBase64] = useState(""); // State for storing base64 image
  const [errorNote, setErrorNote] = useState(null);

  useEffect(() => {
    setEditPostText(postText);
    setEditPostPicBase64(postPic);
  }, [postPic, postText]);

  // Function to handle image file change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {

      // Convert the image to base64
      const reader = new FileReader();
      reader.onloadend = () => {
        setEditPostPicBase64(reader.result);  // Set the base64 data
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSaveChanges = async () => {
    if (!editPostText) {
      setErrorNote("you can't edit post without text");
      return;
    }
    const result = await updatePost(Id, editPostText, editPostPicBase64);
    if (!result.success) {
      setErrorNote("problem with edit post: " + result.message);
      return;
    } else {
      handleClose();
      setErrorNote(null);
      refreshPosts();
    }
  };

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title className='model-title'>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formText">
            <Form.Control as="textarea" rows={3} value={editPostText} onChange={(e) => setEditPostText(e.target.value)} required />
          </Form.Group>

          <Form.Group controlId="formFile" className="mt-3">
            <Form.Control type="file" accept="image/*" onChange={handleImageChange} required />
          </Form.Group>

          {editPostPicBase64 && (
            <div className="mt-3">
              <h6>Preview:</h6>
              <img src={editPostPicBase64} alt="Post preview" style={{ width: '100%', maxHeight: '300px', objectFit: 'contain' }} />
            </div>
          )}
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <i className="bi bi-trash2 action-button" onClick={handleClose}></i>
        <i className="bi bi-floppy2-fill action-button" onClick={handleSaveChanges}></i>
      </Modal.Footer>
      {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)} />}
    </Modal>
  );
}

export default EditPostModel;
