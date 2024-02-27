import React, { useState } from "react";
import "./Login.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
export default function Login() {
  const [email, setEmail] = useState(localStorage.getItem("450dsaEmail") || "");
  const [password, setPassword] = useState("");
  const onCheckBoxChange = () => {
    localStorage.setItem("450dsaEmail", email);
  };
  const onSubmit = (e) => {
    e.preventDefault();
    alert(email);
  };
  return (
    <div className="container mx-auto d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="loginContainer mx-auto">
        <form className="flex mt-5">
          <div class="form-group">
            <label for="exampleInputEmail1">Email address</label>
            <input
              type="email"
              required
              class="form-control"
              id="exampleInputEmail1"
              aria-describedby="emailHelp"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <small id="emailHelp" class="form-text text-muted">
              We'll never share your email with anyone else.
            </small>
          </div>
          <div class="form-group">
            <label for="exampleInputPassword1">Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword1"
              placeholder="Password"
              value={password}
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div class="form-group form-check d-flex justify-content-between">
            <input
              onChange={onCheckBoxChange}
              type="checkbox"
              class="form-check-input"
              id="exampleCheck1"
            />
            <label class="form-check-label" for="exampleCheck1">
              Remember
            </label>
            <Link to={"/forgot-password"}>Forgot password</Link>
          </div>
          <div class="d-grid">
            <button
              class="btn btn-primary w-100"
              onClick={(e) => onSubmit(e)}
              type="submit"
            >
              Log in
            </button>
          </div>
          <div className="mt-4">
            <p>
              Don't have an account? <Link to={"/register"}>Register</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
