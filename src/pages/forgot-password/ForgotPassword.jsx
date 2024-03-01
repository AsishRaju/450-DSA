import React, { useState } from "react";
import "./ForgotPassword.css";
import { toast, ToastContainer } from "react-toastify";
import { Link } from "react-router-dom";
import axios from "axios";
import { PASSWORD_RESET_REQUEST } from "../../services/url";
import { useHistory } from "react-router-dom";
export default function ForgotPassword() {
  const [email, setEmail] = useState(localStorage.getItem("450dsaEmail") || "");
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data } = await axios.post(
        PASSWORD_RESET_REQUEST,
        { email },
        { validateStatus: false }
      );
      setLoading(false);
      if (data.success) {
        toast.success(data.message);
        toast.info("Please check your email");
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      } else {
        toast.error(data.message);
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      }
    } catch (error) {
      console.log(error.message);
      toast.error(error.message);
    }
  };
  return (
    <div className="container mx-auto d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="loginContainer mx-auto">
        <h3 className="text-center mt-2 text-decoration-underline">
          <u>{"Forgot password"}</u>
        </h3>
        <form className="flex mt-5">
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
              we'll send you a link to get back into your account.
            </small>
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary w-100"
              onClick={(e) => onSubmit(e)}
              type="submit"
            >
              {loading ? "Loading..." : "Agree to send email"}
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
