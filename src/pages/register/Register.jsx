import React, { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "./Register.css";
import { Link } from "react-router-dom";
export default function Register() {
  const [email, setEmail] = useState(localStorage.getItem("450dsaEmail") || "");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const onCheckBoxChange = () => {
    localStorage.setItem("450dsaEmail", email);
  };
  // Register
  const onSubmit = (e) => {
    e.preventDefault();
    toast.error(email);
  };
  return (
    <div className="container mx-auto d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="loginContainer mx-auto">
        <h3 className="text-center mt-2 text-decoration-underline">
          <u>{"Register"}</u>
        </h3>
        <form className="flex mt-5">
          <div className="form-group">
            <label for="exampleInputEmail1">Name</label>
            <input
              type="text"
              required
              minLength={1}
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              required
              className="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" className="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div className="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="form-group form-check">
            <input
              onChange={onCheckBoxChange}
              type="checkbox"
              className="form-check-input"
              id="exampleCheck1"
            />
            <label className="form-check-label" for="exampleCheck1">
              Remember
            </label>
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary w-100"
              onClick={(e) => onSubmit(e)}
              type="submit"
            >
              Register
            </button>
          </div>
          <div className="mt-4">
            <p>
              Alreday have an account? <Link to={"/login"}>Log in</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
