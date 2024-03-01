import React, { useEffect, useState } from "react";
import "./Reset.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { CHANGE_PASSWORD } from "../../services/url";
export default function ResetPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);

  const changeMyPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!password || !confirmPassword) {
      toast.error("All fileds are required");
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast.error("Password mismatch");
      setLoading(false);
      return;
    }
    try {
      const token = searchParams.get("token");
      const { data } = await axios.post(
        CHANGE_PASSWORD,
        { token, password, confirmPassword },
        { validateStatus: false }
      );
      setLoading(false);
      console.log(data);
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        setTimeout(() => {
          history.push("/login");
        }, 3000);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };

  useEffect(() => {
    if (searchParams.get("token") === null) {
      toast.error("Cannot Find Token");
      setTimeout(() => {
        history.push("/");
      }, 3000);
    }
  }, []);
  return (
    <div className="container mx-auto d-flex justify-content-center align-items-center">
      <ToastContainer />
      <div className="loginContainer mx-auto">
        <h3 className="text-center mt-2 text-decoration-underline">
          <u>{"Password reset"}</u>
        </h3>
        <form className="flex mt-5">
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
          <div className="form-group mb-5">
            <label for="exampleInputPassword1">Confirm Password</label>
            <input
              type="password"
              className="form-control"
              id="exampleInputPassword2"
              placeholder="Confirm password"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </div>
          <div className="d-grid">
            <button
              className="btn btn-primary w-100"
              onClick={(e) => changeMyPassword(e)}
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
