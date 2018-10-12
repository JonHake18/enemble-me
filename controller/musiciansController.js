const db = require("../models");
const Musician = db.Musician;
const Instrument = db.Instrument;
const User = db.User;
const mongoose = require("mongoose");

function filterInstruments(results, instrumentArr, exp){
      let searchResults =[];
      let checkInstruments = (instrumentArr === undefined)? false: true;
      for(let i = 0; i < results.length; i++){
            for(let j=0; j < results[i].instrumentsPlayed.length; j++){
                  if(results[i].instrumentsPlayed[j].yearsExp >= exp){
                        if(checkInstruments && instruments.includes(results[i].instrumentsPlayed[j].instrument)){
                              searchResults.push(results[i])
                        } else if(!checkInstruments){
                              searchResults.push(results[i]);
                        }
                  }
            }
      }
      return searchResults;
}
// Defining methods for the booksController
module.exports = {
      findAll: function(req, res) {
          db.Musician
            .find(req.body)
            .populate("userInfo")
            .sort({ date: -1 })
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
      findById: function(req, res) {
          db.Musician
            .findById(req.params.id)
            .populate("userInfo")
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
      create: function(req, res) {
            let instrumentPlayed = req.body.instruments;
            let newMusician = new Musician({
                  _id: new mongoose.Types.ObjectId(),
                  firstName: req.body.firstName,
                  lastName: req.body.lastName,
                  location: req.body.location,
                  videoUrl: req.body.videoUrl,
                  instrumentsPlayed: [],
                  userInfo: req.body.userId
            });
            instrumentPlayed.forEach(element=>{
                  let newInstrument = new Instrument({
                        _id: new mongoose.Types.ObjectId(),
                        instrument: element.instrument,
                        yearsExp: element.yearsExp,
                        musicianInfo: newMusician._id
                  });
                  newMusician.instrumentsPlayed.push(newInstrument);
                  newInstrument.save((err=>{
                        if(err) throw new Error(`Could Not Save new Instrument ${newInstrument}:\n\t${err}`);    
                  }));
            });
            console.log(newMusician);
            newMusician.save((err=>{
                  if(err) throw new Error(`Could Not Save new Musician ${newMusician}:\n\t${err}`)
                  Musician.findById(newMusician._id)
                  .populate("instrumentsPlayed")
                  .then(result=>{
                        res.json(result);
                  })
                  .catch(err=> {
                        throw new Error(`Could not Retrieve the newly Created Musician:\n\t${err}`);
                  })
            }));
      },
      update: function(req, res) {
          db.Musician
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
      search: function(req, res) {
            let musicQuery={};
            if(req.query.location !== undefined) musicQuery.location = req.query.location;
            if(req.query.genre !== undefined) musicQuery.genre = req.query.genre;
            let instruments = (req.query.instruments !== undefined)? req.query.instruments.split(","):undefined;
            let exp = (req.query.exp !== undefined)? req.query.exp: 0;

            db.Musician.find({})
            .populate({
                  path: "instrumentsPlayed",
                  select: "instrument yearsExp"
            })
            .where(musicQuery)
            .then(results=>{
                  let searchResults = filterInstruments(results, instruments, exp);
                  res.json(searchResults);
            })
            .catch(err=>{
                  throw new Error(`Could not Complete Search request:\n\t${err}`);
            })

            // db.Instrument.find({})
            // .where('instrument').in(instruments)
            // .where('yearsExp').gte(exp)
            // .populate("musicianInfo")
            // .then(results=>{
            //       res.json(results);
            // })
            // .catch(err=>{
            //       throw new Error(`Could Not Complete Search Request:\n\t${err}`);
            // })
      },
      remove: function(req, res) {
          db.Musician
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
};
