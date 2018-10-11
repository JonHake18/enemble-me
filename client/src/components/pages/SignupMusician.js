import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import './signup.css';
import { Link } from "react-router-dom";


class Signup extends Component {
	constructor() {
		super()
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			videoLink: '',
			username: '',
			password: '',
			passwordConfirm: '',
			instrument: '',
			location: '',
			redirectTo: null
		}
		this.handleSubmit = this.handleSubmit.bind(this)
		this.handleChange = this.handleChange.bind(this)
	}
	handleChange(event) {
		this.setState({
			[event.target.name]: event.target.value
		})
	}
	handleSubmit(event) {
		event.preventDefault()
		// TODO - validate!
		axios
			.post('/auth/signup', {
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				password: this.state.password,
				passwordConfirm: this.state.passwordConfirm,
				videoLink: this.state.videoLink,
				email: this.state.email,
				location: this.state.location,
				instrument: this.state.instrument
			})
			.then(response => {
				console.log(response)
				if (!response.data.errmsg) {
					console.log('youre good')
					this.setState({
						redirectTo: '/login'
					})
				} else {
					console.log('duplicate')
				}
			})
	}



	render() {
		if (this.state.redirectTo) {
			return <Redirect to={{ pathname: this.state.redirectTo }} />
		}
		return (
			<div>
				<div className="SignupForm">
					<h1>Ensemble Me Musician Signup form</h1>
					<form>
						<div className="form-row">
            				<div className="form-group col-md-12">
              					<div class="radioGroupContainer" id="radioChoicesOne">
                				<div class="radioButtonContainer">
                  					<div name="Band"></div>
									  <Link to="/signupBand" class="radioButtonLabel"  className={window.location.pathname === "/signupBand" ? "nav-link active" : "nav-link"}>Band</Link>
                				</div>
                				<div class="radioButtonContainer">
                  					<div name="Musician"></div>
									  <Link to="/signupMusician" class="radioButtonLabel"  className={window.location.pathname === "/signupMusician" ? "nav-link active" : "nav-link"}>Musician</Link>
								</div>
              				</div>
						</div>
						<div className="form-group col-md-3">
								<label htmlFor="firstName">First Name: </label>
								<input
									type="text"
									className="form-control"
									id="inputFirstName"
									placeholder="First Name"
									name="firstName"
									value={this.state.firstName}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group col-md-3">
								<label htmlFor="lastName">Last Name: </label>
								<input
									type="text"
									className="form-control"
									id="inputLasttName"
									placeholder="Last Name"
									name="lasttName"
									value={this.state.lastName}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group col-md-3">
                			<label htmlFor="location">City: </label><br></br>
                			<select value={this.state.value} onChange={this.handleChange}>
                  				<option value="KansasCity">Kansas City</option>
                  				<option value="NewYork">New York</option>
                  				<option value="LosAngeles">Los Angeles</option>
                  				<option value="Miami">Miami</option>
                			</select>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="instrument">Instrument Played: </label>
								<input
									type="text"
									className="form-control"
									id="inputInstrument"
									placeholder="Instrument Played"
									name="instument"
									value={this.state.instrument}
									onChange={this.handleChange}
								/>
							</div>
              				<div className="form-group col-md-6">
								<label htmlFor="experience">Experience: </label>
								<input
									type="text"
									className="form-control"
									id="inputExperience"
									placeholder="Experience"
									name="experience"
									value={this.state.experience}
									onChange={this.handleChange}
								/>
							</div>
              <div className="form-group col-md-12">
								<label htmlFor="email">Email: </label>
								<input
									type="email"
									className="form-control"
									id="inputEmail"
									placeholder="Email"
									name="email"
									value={this.state.email}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="password">Password: </label>
								<input
									type="password"
									className="form-control"
									id="inputPassword"
									placeholder="Password"
									name="password"
									value={this.state.password}
									onChange={this.handleChange}
								/>
							</div>
							<div className="form-group col-md-6">
								<label htmlFor="passwordConfirm">Confirm Password: </label>
								<input
									type="password"
									className="form-control"
									id="inputPasswordConfirm"
									placeholder="Re-Type Password"
									name="passwordConfirm"
									value={this.state.passwordConfirm}
									onChange={this.handleChange}
								/>
							</div>
              <div className="form-group col-md-12">
								<label htmlFor="videoLink">YouTube Video Link: </label>
								<input
									type="text"
									className="form-control"
									id="inputVideoLink"
									placeholder="https://youtu.be/A71aqufiNtQ"
									name="videoLink"
									value={this.state.videoLink}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<button className="btn btn-primary" type="submit" onClick={this.handleSubmit}>Sign up</button>
					</form>
				</div>
			</div>
		)
	}
}


export default Signup
