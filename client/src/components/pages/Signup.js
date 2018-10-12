import React, { Component } from 'react'
import axios from 'axios'
import { Redirect } from 'react-router-dom'
import './signup.css';


const city_names = ["Kansas City", "New York", "Los Angeles"];


class Signup extends Component {
	constructor() {
		super()
		this.state = {
			firstName: '',
			lastName: '',
			email: '',
			photos: '',
			username: '',
			password: '',
			confirmPassword: '',
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
				username: this.state.username,
				password: this.state.password,
				firstName: this.state.firstName,
				lastName: this.state.lastName,
				email: this.state.email,
				photos: this.state.photos
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
					<h1>Ensemble Me Signup form</h1>
					<form>
						<div className="form-row">
            				<div className="form-group col-md-12">
              					<div class="radioGroupContainer" id="radioChoicesOne">
                				<div class="radioButtonContainer">
                  					<div name="Band"></div>
                  					<input type="button" id= "radioBand" class="radioButtonLabel" value="Band"></input>
                				</div>
                				<div class="radioButtonContainer">
                  					<div name="Musician"></div>
                  					<input type="button" class="radioButtonLabel" value="Musician"></input>
                				</div>
              				</div>
						</div>
						<div className="form-group col-md-3">
								<label htmlFor="bandName">Band Name: </label>
								<input
									type="text"
									className="form-control"
									id="inputFirstName"
									placeholder="Band Name"
									name="bandName"
									value={this.state.bandName}
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
                /></select>
							</div>
							<div className="form-group col-md-3">
								<label htmlFor="musciGenre">Music Genre: </label>
								<input
									type="text"
									className="form-control"
									id="inputMusicGenre"
									placeholder="Music Genre"
									name="musicGenre"
									value={this.state.musicGenre}
									onChange={this.handleChange}
								/>
							</div>
						</div>
						<div className="form-row">
							<div className="form-group col-md-6">
								<label htmlFor="instrument">Instrument Needed: </label>
								<input
									type="text"
									className="form-control"
									id="inputUsername"
									placeholder="Username"
									name="username"
									value={this.state.username}
									onChange={this.handleChange}
								/>
							</div>
              <div className="form-group col-md-6">
								<label htmlFor="experience">Experience: </label>
								<input
									type="text"
									className="form-control"
									id="inputUsername"
									placeholder="Username"
									name="username"
									value={this.state.username}
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
									placeholder="Password"
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
              <div className="form-group col-md-12">
								<label htmlFor="bandDescription">Band Description: </label>
								<input
									type="text"
									className="form-control"
									id="inputBandDecsription"
									placeholder="Band Description"
									name="bandDescription"
									value={this.state.bandDesciption}
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
