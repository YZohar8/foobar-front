import { updatePost } from '../fakeDatabase/postsFakeDatabase.js'
import React, { useState, useEffect } from 'react';
import { Modal, Form } from 'react-bootstrap';
import ErrorNote from '../errorNote/ErrorNote.js'
import './EditPostModel.css'




function EditPostModel({ show, handleClose, Id, postText, postPic, refreshPosts }) {
  const [editPostText, setEditPostText] = useState("");
  const [editPostPic, setEditPostPic] = useState(null);
  const [errorNote, setErrorNote] = useState(null);

  useEffect(() => {
    setEditPostText(postText);
    setEditPostPic(postPic);
  }, [postPic, postText]);

  const handleSaveChanges = () => {
    if (!(editPostPic && editPostText)) {
      setErrorNote("you can't edit post witout text and picture");
      return;
    }
    if (!updatePost(Id, editPostText, editPostPic)) {
      setErrorNote("problem eith edit post");
      return;
    }

    handleClose();
    setErrorNote(null);
    refreshPosts();

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

          <Form.Group controlId="formFile" className="mt-3" >
            <Form.Control type="file" accept="image/*" onChange={(e) => {
              if (e.target.files[0]) {
                setEditPostPic(e.target.files[0]);
              }
            }}
              required />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <i class="bi bi-trash2 action-button" onClick={handleClose}></i>

        <i class="bi bi-floppy2-fill action-button" onClick={handleSaveChanges}></i>
      </Modal.Footer>
      {errorNote && <ErrorNote message={errorNote} onClose={() => setErrorNote(null)} />}
    </Modal>
  );
}
export default EditPostModel;