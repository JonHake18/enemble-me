import React from "react";
import "./Find.css";
import DropdownList from "../Form/DropdownList";
import city_names from "../Arrays/Cities";
import state_names from "../Arrays/States";

const FindBand = () => (
  <div className="content">
    <h1>Find A Band</h1>
    <div className="row">
      <div className="col-sm-2" id="city">Band Name</div>
      <div className="col-sm-4 input-group" id="band-name">
        <input type="text" class="form-control"></input>
      </div>
      <div className="col-sm-2" id="city">Music Genre</div>
      <div className="col-sm-4 input-group" id="band-genre">
        <input type="text" class="form-control"></input>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-2" id="city">Instrument Desired</div>
      <div className="col-sm-4 input-group" id="instrument-desired">
        <input type="text" class="form-control"></input>
      </div>
      <div className="col-sm-2" id="state">Experience</div>
      <div className="col-sm-4 input-group" id="band-experience">
        <input type="text" class="form-control"></input>
      </div>
    </div>
    <div className="row">
      <div className="col-sm-2" id="city">City</div>
      <div className="col-sm-4 input-group" id="band-city">
        <DropdownList data={city_names} id="city-names"
          name="city"
        />
      </div>
      <div className="col-sm-2" id="state">State</div>
      <div className="col-sm-4 input-group" id="band-state">
        <DropdownList data={state_names} id="state-names"
          name="state"
        />
      </div>
    </div>
    <div className="row">
      <div className="col-sm-12">
        <button class="btn btn-outline-secondary find-submit" type="button" id="find-submit-band">Search</button>
      </div>
    </div>
  </div>

);

export default FindBand;