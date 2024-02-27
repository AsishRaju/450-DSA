import React, { useState } from "react";
import "./Reset.css";
import { Link } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
export default function PasswordReset() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Both are not same");
    }
  };
  return (
    <div className="container mx-auto d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="loginContainer mx-auto">
        <h3 className="text-center mt-2 text-decoration-underline">
          <u>{"Password reset"}</u>
        </h3>
        <form className="flex mt-5">
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
          <div class="form-group mb-5">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              class="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div class="d-grid">
            <button
              class="btn btn-primary w-100"
              onClick={(e) => onSubmit(e)}
              type="submit"
            >
              Reset my password
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
