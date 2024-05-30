// import axios from "axios";
import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { loginAccount } from "../Redux/Features/userSlice";

function Login() {
  const { error } = useSelector((state) => state.user);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogin = (e) => {
    e.preventDefault();
    dispatch(loginAccount(user));
    if (error === "") {
      navigate("/");
    } else {
      alert(error);
    }
  };

  return (
    <div
      className="p-3 mb-5 bg-white rounded border"
      style={{ width: "400px", marginLeft: "460px", marginTop: "100px" }}
    >
      <h4 style={{ marginLeft: "150px" }}>Login</h4>
      <Form onSubmit={handleLogin}>
        <Form.Group className="mb-3" controlId="loginformBasicPassword">
          <Form.Label>Email</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter Email"
            onChange={(e) => setUser({ ...user, email: e.target.value })}
          />
        </Form.Group>
        <Form.Group className="mb-3" controlId="loginformBasicPassword">
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
          Login
        </Button>
        <p>Not Register?</p>
        <Link to="/register">
          <Button
            variant="outline-primary"
            type="submit"
            style={{ width: "100%" }}
          >
            Sign Up
          </Button>
        </Link>
      </Form>
    </div>
  );
}

export default Login;
