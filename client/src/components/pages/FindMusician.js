import React from "react";
import "./Find.css";
import DropdownList from "../Form/DropdownList";
import city_names from "../Arrays/Cities";
import state_names from "../Arrays/States";

const FindMusician = () => (
  <div className="content">
    <h1>Find A Musician</h1>
    <div className="row">
      <div className="col-sm-2" id="city">First Name</div>
      <div className="col-sm-4 input-group" id="musician-first-name">
        <input type="text" class="form-control"></input>
      </div>
      <div className="col-sm-2" id="state">Last Name</div>
      <div className="col-sm-4 input-group" id="musician-last-name">
        <input type="text" class="form-control"></input>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-2" id="city">Instrument</div>
      <div className="col-sm-4 input-group" id="musician-instrument">
        <input type="text" class="form-control"></input>
      </div>
      <div className="col-sm-2" id="state">Experience</div>
      <div className="col-sm-4 input-group" id="musician-experience">
        <input type="text" class="form-control"></input>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-2" id="city">City</div>
      <div className="col-sm-4 input-group" id="musician-city">
        <DropdownList data={city_names} id="city-names"
          name="city"
        />
      </div>
      <div className="col-sm-2" id="state">State</div>
      <div className="col-sm-4 input-group" id="musician-state">
        <DropdownList data={state_names} id="state-names"
          name="state"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <button class="btn btn-outline-secondary find-submit" type="button" id="find-submit-musician">Search</button>
      </div>
    </div>
  </div>

);

export default FindMusician;