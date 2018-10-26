import React from "react";
import DropdownList from "../Form/DropdownList";
import "./Find.css";
import city_names from "../Arrays/Cities";
import state_names from "../Arrays/States";
import API from "../../utils/API.js";

class FindBand extends Component{

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        bandName: "",
        musicGenre: "",
        instruments: "",
        experience: 0,
        city: "",
        state: ""
      },
      searchResults: []
    }
    this.changeStatefulValue = this.changeStatefulValue.bind(this);
  }

  changeStatefulValue(event) {
    const field = event.target.name;
    const data = this.state.formData;
    data[field] = event.target.value;

    this.setState({
      data
    });
  }

  render() {
    return (
      <div className="content">
        <h1>Find A Band</h1>
        <div className="row">
          <div className="col-sm-2" id="city">Band Name</div>
          <div className="col-sm-4 input-group" id="band-first-name">
            <input 
              type="text" 
              className="form-control"
              name="bandName"
              value={this.state.formData.bandName}
              onChange={this.changeStatefulValue}>
            </input>
          </div>
          <div className="col-sm-2" id="state">Music Genre</div>
          <div className="col-sm-4 input-group" id="band-last-name">
            <input 
              type="text" 
              className="form-control"
              name="musicGenre"
              value={this.state.formData.musicGenre}
              onChange={this.changeStatefulValue}>
            </input>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2" id="city">Instruments Wanted</div>
          <div className="col-sm-4 input-group" id="band-genre">
            <input 
              type="text" 
              className="form-control"
              name="instruments"
              value={this.state.formData.instruments}
              onChange={this.changeStatefulValue}>
            </input>
          </div>
          <div className="col-sm-2" id="state">Experience</div>
          <div className="col-sm-4 input-group" id="band-experience">
            <input 
              type="number" 
              className="form-control"
              name="experience"
              value={this.state.formData.experience}
              onChange={this.changeStatefulValue}>
              </input>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2" id="city">City</div>
          <div className="col-sm-4 input-group" id="band-city">
            <DropdownList 
              data={city_names} 
              id="state-names"
              name="city"
              value={this.state.formData.city}
              onChange={this.changeStatefulValue}>
            </DropdownList>
          </div>
          <div className="col-sm-2" id="state">State</div>
          <div className="col-sm-4 input-group" id="band-state">
            <DropdownList 
              data={state_names} 
              id="state-names"
              name="state"
              value={this.state.formData.state}
              onChange={this.changeStatefulValue}>
            </DropdownList>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-outline-secondary find-submit" type="button" id="find-submit-band" onSubmit={this.searchBands}>Search</button>
          </div>
        </div>
      </div>
    )
  }

}

export default FindBand;