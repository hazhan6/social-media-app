import React, { useEffect } from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import "bootstrap/js/src/collapse.js";

function Layout() {
  const navigate = useNavigate();

  const checkLogin = () => {
    let token = localStorage.getItem("token");

    if (token === null || token === undefined) {
      navigate("/login");
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            Social Media App
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0"></ul>
            <a
              onClick={logout}
              href="/login"
              className="btn btn-outline-danger"
            >
              Çıkış Yap
            </a>
          </div>
        </div>
      </nav>
      <Outlet />
    </>
  );
}

export default Layout;
