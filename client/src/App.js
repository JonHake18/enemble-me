import React from "react";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Wrapper from "./components/Wrapper";
import Nav from "./components/Nav";
import Home from "./components/pages/Home";
import Team from "./components/pages/Team";
import BandProfile from "./components/pages/BandProfile";
import MusicianProfile from "./components/pages/MusicianProfile";
import FindMusician from "./components/pages/FindMusician";
import FindBand from "./components/pages/FindBand";
import About from "./components/pages/About";
import Contact from "./components/pages/Contact";
import Login from "./components/pages/Login";
import SignupBand from "./components/pages/SignupBand";
import SignupMusician from "./components/pages/SignupMusician";
import Profile from "./components/pages/Profile";
import './App.css';

const App = () => (
  <Wrapper>
    <Router>
      <div>
        <Nav />
        <div class="container rounded border border-secondary shadow p-3 mb-5">
          <Route exact path="/" component={Home} />
          <Route exact path="/team" component={Team} />
          <Route exact path="/about" component={About} />
          <Route exact path="/bandprofile" component={BandProfile} />
          <Route exact path="/musicianprofile" component={MusicianProfile} />
          <Route exact path="/findmusician" component={FindMusician} />
          <Route exact path="/findband" component={FindBand} />
          <Route exact path="/contact" component={Contact} />
          <Route exact path="/login" component={Login} />
          <Route exact path="/signupBand" component={SignupBand} />
          <Route exact path="/signupMusician" component={SignupMusician} />
          <Route exact path="/profile" component={Profile} />
        </div>
      </div>
    </Router>
  </Wrapper>
);

export default App;
