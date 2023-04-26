import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const apiUrl = process.env.REACT_APP_API_BASE_URL;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = (e) => {
    e.preventDefault();
    axios
      .post(`${apiUrl}/api/login`, {
        email: email,
        password: password,
      })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.user._id);
        navigate("/");
      })
      .catch((err) => {
        alert(err.response.data.message);
      });
  };

  return (
    <div
      className="d-flex justify-content-center"
      style={{ marginTop: "20px" }}
    >
      <div className="col-md-4">
        <div className="card">
          <div className="card-header">
            <h1 className="text-center">Login Page</h1>
          </div>
          <div className="card-body">
            <form autoComplete="off" onSubmit={login}>
              <div className="form-group">
                Email
                <input
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  type="email"
                  className="form-control"
                />
              </div>
              <div className="form-group mt-2">
                Password
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  className="form-control"
                />
              </div>
              <div className="form-group mt-2">
                <button type="submit" className="btn btn-primary w-100">
                  Sign-In
                </button>
              </div>
            </form>
            <Link className="mt-2" to="/register" style={{ float: "right" }}>
              Register
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
