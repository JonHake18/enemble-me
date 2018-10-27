import React, {Component} from "react";
import DropdownList from "../Form/DropdownList";
import "./Find.css";
import city_state from "../Arrays/State&Cities";
import API from "../../utils/API.js";
import SearchResultBand from "../List/searchResultBand";

class FindBand extends Component{

  constructor(props) {
    super(props);

    this.state = {
      formData: {
        bandName: "",
        musicGenre: "",
        instruments: "",
        experience: 0,
        city: [''],
        state: ['']
      },
      searchResults: []
    }
    this.changeStatefulValue = this.changeStatefulValue.bind(this);
    this.searchBands = this.searchBands.bind(this);
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

  searchBands() {
    if(this.state.formData.city !== ['Pick a State'] && this.state.formData.state !== ['Pick a State']){
      API.searchBands(this.state.formData)
      .then(results=>{
        this.setState({hasSearchedBefore: true, searchResults: results.data})
      })
      .catch(err=>{
        console.log(`Could not complete Band Search:\n\t${err}`);
      })
    }
  }

  listSearchResults() {
    const searchResults = this.state.searchResults.map((result, index)=>{
      let resultInstruments = [];
      let resultExp = result.instrumentsDesired.map(item=>{
        resultInstruments.push(item.instrument);
        return item.yearsExp;
      })
      return <SearchResultBand
        bandName={result.bandName}
        bandDescription={result.bandDescription}
        instruments={resultInstruments}
        experience = {resultExp}
        userId = {result._id}
        key= {"Result_" + index}
        ></SearchResultBand>;
    })
    return <div>{searchResults}</div>;
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
              data={city_state[this.state.formData.state]} 
              id="city-names"
              name="city"
              value={this.state.formData.city}
              onChange={this.changeStatefulValue}>
            </DropdownList>
          </div>
          <div className="col-sm-2" id="state">State</div>
          <div className="col-sm-4 input-group" id="band-state">
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
            <button className="btn btn-outline-secondary find-submit" type="button" id="find-submit-band" onClick={this.searchBands}>Search</button>
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

export default FindBand;