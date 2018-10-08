import React from "react";
import { Link } from "react-router-dom";
import "./Nav.css";

const Nav = () => (
  <nav className="navbar navbar-expand-lg navbar-light">
    <button className="navbar-toggler" type="button" data-toggle="collapse" data-target=".navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span className="navbar-toggler-icon"></span>
    </button>
    <div className="collapse navbar-collapse navbarSupportedContent" id="leftNav">
      <ul className="navbar-nav mx-auto">
        <li className="nav-item">
          <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/findmusician" className={window.location.pathname === "/findmusician" ? "nav-link active" : "nav-link"}>Find Musicians</Link>
        </li>
        <li className="nav-item">
          <Link to="/findband" className={window.location.pathname === "/findband" ? "nav-link active" : "nav-link"}>Find Bands</Link>
        </li>
        <li className="nav-item">
          <Link to="/login" className={window.location.pathname === "/login" ? "nav-link active" : "nav-link"}>Log In</Link>
        </li>
      </ul>
    </div>
    <div id="logo">
      <a className="navbar-brand">Ensemble Me</a>
    </div>
    <div className="collapse navbar-collapse navbarSupportedContent" id="rightNav">
      <ul className="navbar-nav mx-auto">
      <li className="nav-item">
          <Link to="/signup" className={window.location.pathname === "/signup" ? "nav-link active" : "nav-link"}>Sign up</Link>
        </li>
        <li className="nav-item">
          <Link to="/team" className={window.location.pathname === "/team" ? "nav-link active" : "nav-link"}>Team</Link>
        </li>
        <li className="nav-item">
          <Link to="/feedback" className={window.location.pathname === "/feedback" ? "nav-link active" : "nav-link"}>Feedback</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className={window.location.pathname === "/contact" ? "nav-link active" : "nav-link"}>Contact</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;