import React, {Component} from "react";
import DropdownList from "../Form/DropdownList";
import "./Find.css";
import API from "../../utils/API.js";
import city_state from "../Arrays/State&Cities";
import SearchResultMusician from "../List/searchResultMusician.js";

class FindMusician extends Component{

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        firstName: "",
        lastName: "",
        instruments: "",
        experience: 0,
        city: [''],
        state:['']
      },
      hasSearchedBefore: false,
      searchResults: []
    }
    this.changeStatefulValue = this.changeStatefulValue.bind(this);
    this.searchMusicians = this.searchMusicians.bind(this);
  }

  componentDidMount(){
    this.setState({hasSearchedBefore: false});
  }
  changeStatefulValue(event) {
    const field = event.target.name;
    const data = this.state.formData;
    data[field] = event.target.value;

    if(field === "state") {
      let city = document.getElementById("city-names").selectedIndex;
      data['city'] = city_state[event.target.value][city] || city_state[event.target.value][0];
      this.setState({
        formData: data
      });
    }
    else{
      this.setState({
        formData: data
      });
    }
    
  }

  searchMusicians() {
    if(this.state.formData.city !== ['Pick a State'] && this.state.formData.state !== ['Pick a State']){
      API.searchMusicians(this.state.formData)
      .then(results=>{
        this.setState({hasSearchedBefore: true, searchResults: results.data})
      })
      .catch(err=>{
        console.log(`Could not complete Musician Search:\n\t${err}`);
      })
    }
  }

  listSearchResults() {
    const searchResults = this.state.searchResults.map((result, index)=>{
      let resultInstruments = [];
      let resultExp = result.instrumentsPlayed.map(item=>{
        resultInstruments.push(item.instrument);
        return item.yearsExp;
      })
      return <SearchResultMusician
        firstName={result.firstName}
        lastName={result.lastName}
        instruments={resultInstruments}
        experience = {resultExp}
        userId = {result._id}
        key= {"Result_" + index}
        ></SearchResultMusician>;
    })
    return <div>{searchResults}</div>;
  }

  render() {
    return (
      <div className="content">
        <h1>Find A Musician</h1>
        <div className="row">
          <div className="col-sm-2" id="city">First Name</div>
          <div className="col-sm-4 input-group" id="musician-first-name">
            <input 
              type="text" 
              className="form-control" 
              name="firstName" 
              value={this.state.formData.firstName}
              onChange={this.changeStatefulValue}>
            </input>
          </div>
          <div className="col-sm-2" id="state">Last Name</div>
          <div className="col-sm-4 input-group" id="musician-last-name">
            <input 
              type="text" 
              className="form-control" 
              name="lastName" 
              value={this.state.formData.lastName}
              onChange={this.changeStatefulValue}>
            </input>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-2" id="city">Instrument</div>
          <div className="col-sm-4 input-group" id="musician-instrument">
            <input 
              type="text" 
              className="form-control" 
              name="instruments" 
              value={this.state.formData.instruments}
              onChange={this.changeStatefulValue}>
            </input>
          </div>
          <div className="col-sm-2" id="state">Experience</div>
          <div className="col-sm-4 input-group" id="musician-experience">
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
          <div className="col-sm-4 input-group" id="musician-city">
            <DropdownList 
              data={city_state[this.state.formData.state]} 
              id="city-names" 
              name="city" 
              value={this.state.formData.city}
              onChange={this.changeStatefulValue}>
            </DropdownList>
          </div>
          <div className="col-sm-2" id="state">State</div>
          <div className="col-sm-4 input-group" id="musician-state">
            <DropdownList 
              data={Object.keys(city_state)} 
              id="state-names" 
              name="state" 
              value={this.state.formData.state}
              onChange={this.changeStatefulValue}>
            </DropdownList>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12">
            <button className="btn btn-outline-secondary find-submit" type="button" id="find-submit-musician" onClick={this.searchMusicians}>Search</button>
          </div>
        </div>
        <div className="row">
          <div className="col-sm-12 searchResults">
            {this.state.hasSearchedBefore &&
              <div>
                {this.listSearchResults()}
              </div>}
          </div>
        </div>
      </div>
    )
  }
}
export default FindMusician;