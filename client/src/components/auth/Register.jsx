import React, { useContext, useState } from "react";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link } from "react-router-dom";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

function Register() {
  //context;
  const { registerUser } = useContext(AuthContext);

  //router
  // const history = useHistory();

  //local state
  const [registerForm, setRegisterForm] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password, confirmPassword } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      setAlert({ type: "danger", message: "Your password do not match" });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
      return;
    }

    const registerData = await registerUser(registerForm);
    // console.log(loginData);
    if (!registerData.success) {
      setAlert({
        type: "danger",
        message: registerData.message || "Username or Password invalid",
      });
      setTimeout(() => {
        setAlert(null);
      }, 5000);
    }

    try {
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <Form onSubmit={register}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeRegisterForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Confirm Password"
            name="confirmPassword"
            required
            value={confirmPassword}
            onChange={onChangeRegisterForm}
          ></Form.Control>
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="password"
            name="password"
            required
            value={password}
            onChange={onChangeRegisterForm}
          ></Form.Control>
        </Form.Group>
        <Button variant="success" type="submit">
          Register
        </Button>
      </Form>
      <p>
        Already have an account ?
        <Link to="/login">
          <Button variant="info" size="sm" className="ml-2">
            Login
          </Button>
        </Link>
      </p>
    </>
  );
}

export default Register;
