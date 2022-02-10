import React, { useState } from "react";
import { Link, Redirect } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";
const Login = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
  });

  const { email, password } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password };
      const response = await fetch(
        "http://localhost:5000/authentication/login",
        {
          method: "POST",
          headers: {
            "Content-type": "application/json",
          },
          body: JSON.stringify(body),
        }
      );
      const parseRes = await response.json();

      if (parseRes.jwtToken) {
        localStorage.setItem("token", parseRes.jwtToken);
        setAuth(true);
        toast.success("Logged in Successfully");
      } else {
        setAuth(false);
        toast.error(parseRes);
      }
    } catch (err) {
      console.error(err.message);
    }
  };

  return (
    <div>
      <h1>Login</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className="form-control my-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">Please enter your email.</Form.Text>
        </Form.Group>

        <Form.Group className="form-control my-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            name="password"
            value={password}
            placeholder="password"
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            Please enter your password.
          </Form.Text>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/register">Click here to register!</Link>
    </div>
  );
};

export default Login;
