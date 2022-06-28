import React, { useContext, useEffect, useState } from "react";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { PostContext } from "../../contexts/PostContext";

function UpdatePost() {
  ///context
  const {
    postState: { post },
    showUpdatePostModal,
    setShowUpdatePostModal,
    updatePost,
    setShowToast,
  } = useContext(PostContext);

  //state
  const [updatedPost, setUpdatedPost] = useState({
    title: "",
    description: "",
    url: "",
    status: "",
  });

  useEffect(() => {
    setUpdatedPost(post);
  }, [post]);

  const { title, description, url, status } = updatedPost;

  const onChangeUpdatedPost = (e) => {
    setUpdatedPost({ ...updatedPost, [e.target.name]: e.target.value });
  };

  const closeDialog = () => {
    setUpdatedPost(post);
    setShowUpdatePostModal(false);
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    const { success, message } = await updatePost(updatedPost);
    setShowUpdatePostModal(false);
    setShowToast({ show: true, message, type: success ? "success" : "danger" });
  };

  // const resetAddPost = () => {
  //   setNewPost({ title: "", description: "", url: "", status: "To Learn" });
  //   setShowModal(false);
  // };

  return (
    <Modal show={showUpdatePostModal} onHide={closeDialog}>
      <Modal.Header closeButton>
        <Modal.Title>Marking Process?</Modal.Title>
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
              onChange={onChangeUpdatedPost}
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
              onChange={onChangeUpdatedPost}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Youtube Totorial URL"
              name="url"
              value={url}
              onChange={onChangeUpdatedPost}
            ></Form.Control>
          </Form.Group>
          <Form.Group>
            <Form.Control
              as="select"
              name="status"
              value={status}
              onChange={onChangeUpdatedPost}
            >
              <option value="To Learn">To Learn</option>
              <option value="Learning">Learning</option>
              <option value="Learned">Learned</option>
            </Form.Control>
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

export default UpdatePost;
