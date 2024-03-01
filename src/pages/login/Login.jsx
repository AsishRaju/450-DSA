import React, { useContext, useEffect, useState } from "react";
import "./Login.css";
import { Link, useHistory } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import axios from "axios";
import { GlobalContext } from "../../context/GlobalContext";
import { LOGIN_URL } from "../../services/url";
import { localStorageKeyForAuthentication } from "../../services/constants";
import { Spinner } from "react-bootstrap";

export default function Login() {
  const [email, setEmail] = useState(localStorage.getItem("450dsaEmail") || "");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const history = useHistory();
  const { setUser, setIsLoggedIn, isLoggedIn } = useContext(GlobalContext);

  useEffect(() => {
    if (isLoggedIn === true) {
      toast.info("Please Log Out");
      setTimeout(() => {
        toast.error("Redirecting to Home");
      }, 300);
      setTimeout(() => {
        history.push("/");
      }, 2000);
    }
  }, []);

  const onCheckBoxChange = () => {
    localStorage.setItem("450dsaEmail", email);
  };
  const onSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    if (!email || !password) {
      toast.error("All files are required");
      setLoading(false);
      return;
    }
    try {
      const { data } = await axios.post(
        LOGIN_URL,
        { email, password },
        { validateStatus: false }
      );
      if (data.success) {
        toast.success("Login Successful 🎉");
        const token = data.data.authToken;
        localStorage.setItem(localStorageKeyForAuthentication, token);
        setUser(data?.data?.user);
        setIsLoggedIn(true);
        setLoading(false);
        setTimeout(() => {
          history.push("/");
        }, 500);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
    setLoading(false);
  };
  return (
    <div className="container mx-auto d-flex justify-content-center align-items-center">
      <ToastContainer />
      {isLoggedIn ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="grow" variant="success" />
        </div>
      ) : (
        <div className="loginContainer mx-auto">
          <h3 className="text-center mt-2 text-decoration-underline">
            <u>{"Log in"}</u>
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
            <div className="form-group form-check d-flex justify-content-between">
              <input
                onChange={onCheckBoxChange}
                type="checkbox"
                className="form-check-input"
                id="exampleCheck1"
              />
              <label className="form-check-label" for="exampleCheck1">
                Remember
              </label>
              <Link to={"/forgot-password"}>Forgot password</Link>
            </div>
            <div className="d-grid">
              <button
                className="btn btn-primary w-100"
                onClick={(e) => onSubmit(e)}
                type="submit"
              >
                {loading ? "Loading..." : "Log in"}
              </button>
            </div>
            <div className="mt-4">
              <p>
                Don't have an account? <Link to={"/register"}>Register</Link>
              </p>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
