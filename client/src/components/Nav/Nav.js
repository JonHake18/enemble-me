import React from "react";
import { Link } from "react-router-dom";

const Nav = () => (
  <nav class="navbar navbar-expand-lg navbar-light bg-light">
    <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
      <span class="navbar-toggler-icon"></span>
    </button>
    <a class="navbar-brand" href="#">Ensemble Me</a>
    <div class="collapse navbar-collapse" id="navbarSupportedContent">
      <ul className="navbar-nav mr-auto">
        <li className="nav-item">
          <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>Home</Link>
        </li>
        <li className="nav-item">
          <Link to="/findmusician" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>Find Musicians</Link>
        </li>
        <li className="nav-item">
          <Link to="/findband" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>Find Bands</Link>
        </li>
        <li className="nav-item">
          <Link to="/team" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>Team</Link>
        </li>
        <li className="nav-item">
          <Link to="/feedback" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>Feedback</Link>
        </li>
        <li className="nav-item">
          <Link to="/contact" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>Contact</Link>
        </li>
      </ul>
    </div>
  </nav>
);

export default Nav;