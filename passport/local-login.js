const jwt = require('jsonwebtoken');
const db = require("../models");
const User = db.User;
const PassportLocalStrategy = require('passport-local').Strategy;
const config = require('../config');


/**
 * Return the Passport Local Strategy object.
 */
module.exports = new PassportLocalStrategy({
  usernameField: 'email',
  passwordField: 'password',
  session: false,
  passReqToCallback: true
}, (req, email, password, done) => {
  
  const userData = {
    email: email.trim(),
    password: password.trim()
  };
  // find a user by email address
  return User.findOne({ email: userData.email })
    .select("+ email + password firstName lastName bandName city state bandDescription instrumentsPlayed instrumentsDesired")
    .populate("instrumentsPlayed")
    .populate("instrumentsDesired")
    .catch(err => {
        console.log(`Could not find single user with matching email:\n\t${err}`);
        return done(err);
    })
    .then(user=> {
      if (!user) {
        const error = new Error('Incorrect email or password');
        error.name = 'IncorrectCredentialsError';
        console.log(error);
        return done(error);
      }
      console.log(JSON.stringify(user));
      // check if a hashed user's password is equal to a value saved in the database
      return user.comparePassword(userData.password, (passwordErr, isMatch) => {
        if (passwordErr) { 
          console.log(`Could not complete check on user's password:\n\t${passwordErr}`);
          return done(passwordErr); }

        if (!isMatch) {
          const error = new Error('Incorrect email or password');
          error.name = 'IncorrectCredentialsError';

          return done(error);
        }

        const payload = {
          sub: user._id
        };

        // create a token string
        const token = jwt.sign(payload, config.jwtSecret);
        const data = {
          name: user.name,
        };

        return done(null, token, data);
      });
    });
  }
);
