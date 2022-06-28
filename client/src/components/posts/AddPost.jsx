import React, { useContext, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "./../../contexts/PostContext";

function AddPost() {
  ///context
  const { showModal, setShowModal, addPost, setShowToast } =
    useContext(PostContext);

  //state
  const [newPost, setNewPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "",
  });

  const { title, description, url } = newPost;

  const onChangeNewPost = (e) => {
    setNewPost({ ...newPost, [e.target.name]: e.target.value });
  };

  const closeDialog = () => {
    resetAddPost();
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await addPost(newPost);
    resetAddPost();
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  const resetAddPost = () => {
    setNewPost({ title: "", description: "", url: "", status: "To Learn" });
    setShowModal(false);
  };

  return (
    <Modal show={showModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>What do you want to learn?</Modal.Title>
      </Modal.Header>
      <Form onSubmit={onSubmit}>
        <Modal.Body className="my-2">
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="title"
              name="title"
              required
              aria-describedby="title-help"
              value={title}
              onChange={onChangeNewPost}
            ></Form.Control>
            <Form.Text id="title-help" muted className="my-2">
              Required
            </Form.Text>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="textarea"
              row={3}
              placeholder="description"
              name="description"
              className="my-3"
              value={description}
              onChange={onChangeNewPost}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Totorial URL"
              name="url"
              value={url}
              onChange={onChangeNewPost}
            ></Form.Control>
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={closeDialog}>
            Cancel
          </Button>
          <Button variant="primary" type="submit">
            Learn IT !
          </Button>
        </Modal.Footer>
      </Form>
    </Modal>
  );
}

export default AddPost;
