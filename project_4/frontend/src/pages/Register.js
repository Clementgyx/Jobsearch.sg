import React, { useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Form from "react-bootstrap/Form";
import Button from "react-bootstrap/esm/Button";

const Register = ({ setAuth }) => {
  const [inputs, setInputs] = useState({
    email: "",
    password: "",
    name: "",
  });

  const { email, password, name } = inputs;

  const onChange = (e) =>
    setInputs({ ...inputs, [e.target.name]: e.target.value });

  const onSubmitForm = async (e) => {
    e.preventDefault();
    try {
      const body = { email, password, name };
      const response = await fetch(
        "http://localhost:5000/authentication/register",
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
        toast.success("Register Successfully");
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
      <h1>Register</h1>
      <Form onSubmit={onSubmitForm}>
        <Form.Group className="form-control my-3" controlId="formBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            name="name"
            value={name}
            placeholder="name"
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            Please pick a unique name.
          </Form.Text>
        </Form.Group>

        <Form.Group className="form-control my-3" controlId="formBasicEmail">
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type="text"
            name="email"
            value={email}
            placeholder="email"
            onChange={(e) => onChange(e)}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
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
            Please create a password of up to 30 characters for the best
            security.
          </Form.Text>
        </Form.Group>
        <Button variant="success" type="submit">
          Submit
        </Button>
      </Form>
      <Link to="/login">Click here to login!</Link>
    </div>
  );
};

export default Register;
