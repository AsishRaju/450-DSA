import React, { useState } from "react";
import "./ForgotPassword.css";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
export default function ForgotPassword() {
  const [email, setEmail] = useState(localStorage.getItem("450dsaEmail") || "");
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
              we'll send you a link to get back into your account.
            </small>
          </div>
          <div class="d-grid">
            <button
              class="btn btn-primary w-100"
              onClick={(e) => onSubmit(e)}
              type="submit"
            >
              Agree to send email
            </button>
          </div>
          <div className="mt-4">
            <p>
              Back to <Link to={"/login"}>Log in?</Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
