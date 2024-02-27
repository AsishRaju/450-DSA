import React, { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { VERIFY_EMAIL } from "../../services/url";
import axios from "axios";

export default function VerifyEmail() {
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const history = useHistory();

  const searchParams = new URLSearchParams(location.search);

  const markEmailAsVerified = async () => {
    try {
      const { data } = await axios.post(
        VERIFY_EMAIL + searchParams.get("token"),
        {},
        { validateStatus: false }
      );
      console.log(data);
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
        setTimeout(() => {
          history.push("/");
        }, 3000);
      } else {
        toast.error(data.message);
        history.push("/login");
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
    } else {
      markEmailAsVerified();
    }
  }, []);
  console.log(searchParams.get("token"));

  return (
    <div>
      <div className="container mt-5">
        <div className="row justify-content-center">
          <ToastContainer />
          <div className="col-md-8 text-center">
            {loading ? (
              "Verifying..."
            ) : (
              <>
                <h2 className="mb-4">Email Verification Successful</h2>
                <h1 className="img-fluid rounded-circle mb-4">✅</h1>
                <p className="lead">
                  Congratulations! Your email has been successfully verified.
                  You can now access all the features.
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
