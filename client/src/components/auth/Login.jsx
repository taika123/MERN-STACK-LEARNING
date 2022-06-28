import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/Button";
import { Link, useHistory } from "react-router-dom";
import React, { useState, useContext } from "react";
import { AuthContext } from "../../contexts/AuthContext";
import AlertMessage from "../layout/AlertMessage";

const Login = () => {
  //context;
  const { loginUser } = useContext(AuthContext);

  //router
  // const history = useHistory();

  //local state
  const [loginForm, setLoginForm] = useState({
    username: "",
    password: "",
  });

  const [alert, setAlert] = useState(null);

  const { username, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (e) => {
    e.preventDefault();

    const loginData = await loginUser(loginForm);
    // console.log(loginData);
    if (loginData.success) {
      // history.push("/dashboard");
    } else {
      setAlert({
        type: "danger",
        message: loginData.message || "Username or Password invalid",
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
    <React.Fragment>
      <Form className="my-4" onSubmit={login}>
        <AlertMessage info={alert} />
        <Form.Group>
          <Form.Control
            type="text"
            placeholder="Username"
            name="username"
            required
            value={username}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Form.Group className="my-3">
          <Form.Control
            type="password"
            placeholder="Password"
            name="password"
            suggested="new-password"
            required
            value={password}
            onChange={onChangeLoginForm}
          />
        </Form.Group>
        <Button variant="success" type="submit">
          Login
        </Button>
      </Form>
      <p>
        Don't have an account ?
        <Link to="/register">
          <Button variant="info" size="sm" className="ml-2">
            Register
          </Button>
        </Link>
      </p>
    </React.Fragment>
  );
};

export default Login;
