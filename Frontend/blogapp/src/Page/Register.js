import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { createAccount } from "../Redux/Features/userSlice";

function Register() {
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(createAccount(user));
    navigate("/login");
  };

  return (
    <div
      className="p-3 mb-5 bg-white rounded border"
      style={{ width: "400px", marginLeft: "460px", marginTop: "100px" }}
    >
      <h4 style={{ marginLeft: "150px" }}>Sign Up</h4>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3" controlId="createformBasicName">
          <Form.Label>Name</Form.Label>
          <Form.Control
            type="text"
            placeholder="Enter Full Name"
            onChange={(e) => setUser({ ...user, name: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createformBasicEmail">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="createformBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type="password"
            placeholder="Password"
            onChange={(e) => setUser({ ...user, password: e.target.value })}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          style={{ width: "100%" }}
          className="mb-3"
        >
          Sign up
        </Button>
      </Form>
      <p>Already have account?</p>
      <Link to="/login">
        <Button
          variant="outline-primary"
          type="submit"
          style={{ width: "100%" }}
        >
          Login
        </Button>
      </Link>
    </div>
  );
}

export default Register;
