const db = require("../models");
const User = db.User;

function filterInstruments(results, instrumentArr, exp){
      let searchResults =[];
      let checkInstruments = (instrumentArr[0] instanceof RegExp)? false: true;
      for(let i = 0; i < results.length; i++){
            for(let j=0; j < results[i].instrumentsDesired.length; j++){
                  if(results[i].instrumentsDesired[j].yearsExp >= exp){
                        if(checkInstruments && instrumentArr.includes(results[i].instrumentsDesired[j].instrument)){
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
            User
            .find()
            .where("isMusician").equals(false)
            .select("bandName city state instrumentsDesired videoLink bandDescription musicGenre")
            .populate("instrumentsDesired")
            .sort(-lastName)
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                  console.log(`Could not find All Bands:\n\t${err}`);
                  res.status(422).json(err);
            });
        },
        findById: function(req, res) {
            User
            .findById(req.params.id)
            .where("isMusician").equals(false)
            .select("bandName city state instrumentsDesired videoLink bandDescription musicGenre")
            .populate("instrumentsDesired")
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                  console.log(`Could not find Band matching ID:\n\t${err}`);
                  res.status(422).json(err);
            });
        },
        update: function(req, res) { 
            User
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .where("isMusician").equals(false)
            .then(dbModel => res.json(dbModel))
            .catch(err => {
                  console.log(`Could not update Band with provided UserID:\n\t${err}`);
                  res.status(422).json(err);
            });
        },
        search: function(req, res) {
            let bandQuery={};
            if(req.query.firstName !== undefined) musicQuery.firstName = req.query.firstName;
            if(req.query.lastName !== undefined) musicQuery.lastName = req.query.lastName;
            if(req.query.city !== undefined) musicQuery.city = req.query.city;
            if(req.query.state !== undefined) musicQuery.state = req.query.state;
            let instruments = (req.query.instruments !== undefined)? req.query.instruments.split(","):[/^\S/];
            let exp = (req.query.experience !== undefined && !isNaN(Number(req.query.experience)))?
                  Number(req.query.experience): 0;

            User.find(bandQuery)
            .select("bandName city state instrumentsDesired videoLink bandDescription musicGenre")
            .where("isMusician").equals(false)
            .populate({
                  path: "instrumentsDesired",
                  select: "instrument yearsExp",
                  match: {
                        yearsExp: {$gte: exp},
                        instrument: {$in: [...instruments]}
                  }
            })
            .then(results=>{
                  if(!instruments[0] instanceof RegExp || exp > 0){
                        let searchResults = filterInstruments(results, instruments, exp);
                        res.json(searchResults);  
                  } 
                  else res.json(results);
            })
            .catch(err=>{
                  throw new Error(`\nCould not Complete Search request:\n\t${err}`);
            })
        },
        remove: function(req, res) {
            User
            .findById({ _id: req.params.id })
            .where("isMusician").equals(false)
            .select("bandName city state instrumentsDesired videoLink bandDescription musicGenre")
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
        },
};
