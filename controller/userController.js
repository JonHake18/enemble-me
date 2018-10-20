const db = require("../models");
const mongoose = require("mongoose");
const User = db.User;
const Band = db.Band;
const Musician = db.Musician;
const Instrument = db.Instrument;

// Defining methods for the booksController
module.exports = {
     findAll: function(req, res) {
               db.User
                    .find(req.body)
                    .populate("musicianInfo")
                    .populate("bandInfo")
                    .populate("instrumentsPlayed")
                    .populate("instrumentsDesired")
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     findById: function(req, res) {
               db.User
                    .findById(req.params.id)
                    .populate("musicianInfo")
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     signup: function(req, res) {
            let newUser = new User({
                _id: new mongoose.Types.ObjectId(),
                username: `${req.body.firstName} ${req.body.lastName}`,
                email: req.body.email,
                password: req.body.password,
                isMusician: req.body.isMusician,
               });
            if(newUser.isMusician){
                  let instrumentPlayed = req.body.instruments;
                  let newMusician = new Musician({
                        _id: new mongoose.Types.ObjectId(),
                        firstName: req.body.firstName,
                        lastName: req.body.lastName,
                        location: `${req.body.city}, ${req.body.state}`,
                        videoLink: req.body.videoLink,
                        instrumentsPlayed: [],
                        userInfo: newUser._id
                  });
                  newUser.musicianInfo = newMusician._id;
                  newUser.save((err, savedUser)=>{
                        if(err){
                              throw new Error(`Could not save new User:\n\t${err}`);
                        }
                        else{
                              res.json(savedUser);
                              instrumentPlayed.forEach(element=>{
                                    let newInstrument = new Instrument({
                                          _id: new mongoose.Types.ObjectId(),
                                          instrument: element.instrument,
                                          yearsExp: element.yearsExp,
                                          isMusician: true,
                                          musicianInfo: newMusician._id
                                    });
                                    newMusician.instrumentsPlayed.push(newInstrument);
                                    newInstrument.save((err=>{
                                          if(err) throw new Error(`\nCould Not Save new Instrument ${newInstrument}:\n\t${err}`);    
                                    }));
                              });
                              newMusician.save((err=>{
                                    if(err) throw new Error(`\nCould Not Save new Musician ${newMusician}:\n\t${err}`)
                                    Musician.findById(newMusician._id)
                                    .populate("instrumentsPlayed")
                                    .then(result=>{
                                          console.log(`New Musician Document Created:\n\t${result}`);                   
                                    })
                                    .catch(err=> {
                                          throw new Error(`\nCould not Retrieve the newly Created Musician:\n\t${err}`);
                                    })
                              }));
                        }
                  })
            }
            else {
                  let instrumentsDesired = req.body.instruments;
                  let newBand = new Band({
                        _id: new mongoose.Types.ObjectId(),
                        bandName: req.body.bandName,
                        location: `${req.body.city}, ${req.body.state}`,
                        musicGenre: req.body.genre,
                        bandVideoLink: req.body.bandVideoLink,
                        instrumentsDesired: [],
                        userInfo: newUser._id
                  });
                  newUser.bandInfo = newBand._id;
                  newUser.save((err, savedUser)=>{
                        if(err){
                              throw new Error(`Could Not Save New User:\n\t${err}`);
                        }
                        else{
                              res.json(savedUser);
                              instrumentsDesired.forEach(element=>{
                              let newInstrument = new Instrument({
                                    _id: new mongoose.Types.ObjectId(),
                                    instrument: element.instrument,
                                    yearsExp: element.yearsExp,
                                    isMusician: false,
                                    bandInfo: newBand._id
                              });
                              newBand.instrumentsDesired.push(newInstrument);
                              newInstrument.save((err=>{
                                    if(err) throw new Error(`\nCould Not Save new Instrument ${newInstrument}:\n\t${err}`);    
                              }));
                              });
                              newBand.save((err=>{
                                    if(err) throw new Error(`\nCould Not Save new Musician ${newMusician}:\n\t${err}`)
                                    Band.findById(newBand._id)
                                    .populate("instrumentsDesired")
                                    .then(result=>{
                                          res.json(result);
                                          db.User.findByIdAndUpdate(req.body.userId,{
                                                bandInfo: result._id
                                          })
                                          .then(result=>{
                                                console.log(`\nUser Information updated...\n`);
                                          })
                                          .catch(err=>{
                                                throw new Error(`\nCould Not update User Information:\n\t${err}`);
                                          })
                                          
                                    })
                                    .catch(err=> {
                                          throw new Error(`\nCould not Retrieve the newly Created Musician:\n\t${err}`);
                                    })
                              }));   
                        }
                  })
                  
            }
         },
     update: function(req, res) {
               db.User
                    .findOneAndUpdate({ _id: req.params.id }, req.body)
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     remove: function(req, res) {
               db.User
                    .findById({ _id: req.params.id })
                    .then(dbModel => dbModel.remove())
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
         },
      // signup: function(req, res) {
      //       const {
      //         firstName,
      //         lastName,
      //         password,
      //         email,
      //         location,
      //         videoLink,
      //         instrumentsPlayed
      //       } = req.body
        
      //       // ADD VALIDATION
      //       db.User.findOne({
      //         'email': email
      //       }, (err, userMatch) => {
      //             if(err){
      //                   throw new Error(`Could Not Complete Validation for Unique Email value:\n\t${err}`);
      //             }
      //             else if (userMatch) {
      //                   return res.json({
      //                         error: `Sorry, already a user with the email: ${email}`
      //                   })
      //             }
      //             const newUser = new User({
      //                   _id: new mongoose.Types.ObjectId(),
      //                   username: `${firstName} ${lastName}`,
      //                   password: password,
      //                   isMusician: true,
      //                   email: email
      //             });
      //             let reqCopy = req;
      //             reqCopy.body.userId = newUser_id;
      //             newUser.save((err, savedUser) => {
      //                   if (err) return res.json(err)
      //                   this.create(reqCopy, res);
      //                   return res.json(savedUser)
      //             })
      //       })
      // }
};
