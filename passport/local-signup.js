const mongoose = require('mongoose');
const db = require('../models');
const User = db.User;
const Instrument = db.Instrument;
const PassportLocalStrategy = require('passport-local').Strategy;

/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  
  let transactionError = false;


  const userData = {
    _id: new mongoose.Types.ObjectId(),
    firstName: req.body.firstName,
    lastName: req.body.lastName,
    city: req.body.city,
    state: req.body.state,
    musicGenre: req.body.genre,
    email: email.trim(),
    password: password.trim(),
    videoLink: req.body.videoLink.trim(),
    isMusician: req.body.isMusician,
    instrumentsPlayed: [],
    instrumentsDesired: []
  };

    if(userData.isMusician){
      let newInstrument = new Instrument({
        instrument: req.body.instrument,
        yearsExp: Number(req.body.experience),
        userInfo: userData._id,
        kind: "PlayedInstrument"
      });
      
      userData.instrumentsPlayed.push(newInstrument);
      newInstrument.save(function(err, result){
        if(err) {
          transactionError = true;
          throw new Error(`Could not create Played instrument Document for new user:\n\t${err}`);
        }
        console.log(result);
      })
    }
    else{
      let newInstrument = new Instrument({
        instrument: req.body.instrument.trim().toLowerCase(),
        yearsExp: Number(req.body.experience),
        userInfo: userData._id,
        kind: "DesiredInstrument"
      });

      userData.instrumentsDesired.push(newInstrument);
      userData.bandName = req.body.bandName;
      userData.bandDescription = req.body.bandDescription;
      newInstrument.save(function(err, result){
        if(err) {
          transactionError = true;
          throw new Error(`Could not create Desired instrument Document for new user:\n\t${err}`);
        }
        console.log(result);
      })
    }
  if(!transactionError){
    const newUser = new User(userData);
    newUser.save((err) => {
      if (err) { return done(err); }

      return done(null);
    });
  }
  else return done(-1);
});
