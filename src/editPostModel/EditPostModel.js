import { updatePost } from '../fakeDatabase/postsFakeDatabase.js'
import React, { useState } from 'react';
import { Modal, Button, Form } from 'react-bootstrap';
import './EditPostModel.css'
import { useNavigate } from 'react-router-dom';



function EditPostModel({ show, handleClose, username, Id, postText, postPic, onSave}) {
  const [editPostText, setEditPostText] = useState(postText);
  const [editPostPic, setEditPostPic] = useState(postPic);
  const navigate = useNavigate();



  const handleSaveChanges = () => {
    if (editPostPic && editPostText) {
      // error messege
      if (!updatePost(Id, editPostText, editPostPic)) {
        // error messege
      };
    }

    handleClose();
    onSave(editPostText, editPostPic);
  };

  useEffect(() => {
    if (show) {
        setEditPostText(postText);
        setEditPostPic(postPic);
    }
}, [show, postText, postPic]); // Dependency array to run when 'show' changes


  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Edit Post</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group controlId="formText">
            <Form.Control as="textarea" rows={3} value={editPostText} onChange={(e) => setEditPostText(e.target.value)} />
          </Form.Group>

          <Form.Group controlId="formFile" className="mt-3" >
            <Form.Control type="file" accept="image/*" onChange={(e) => {
              if (e.target.files[0]) {
                setEditPostPic(URL.createObjectURL(e.target.files[0]));
              }
            }} />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <i class="bi bi-trash action-button" onClick={handleClose}></i>

        <i class="bi bi-floppy2-fill action-button" onClick={handleSaveChanges}></i>
      </Modal.Footer>
    </Modal>
  );
}
export default EditPostModel;