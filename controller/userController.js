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
                    .select("+email +password firstName lastName bandName +isMusician city state videoLink")
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     findById: function(req, res) {
               db.User
                    .findById(req.params.id)
                    .select("+email +password firstName lastName bandName +isMusician city state videoLink")
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     update: function(req, res) {
               db.User
                    .findOneAndUpdate({ _id: req.params.id }, req.body)
                    .select("+email +password firstName lastName bandName +isMusician city state videoLink")
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
          },
     remove: function(req, res) {
               db.User
                    .findById({ _id: req.params.id })
                    .select("+email +password firstName lastName bandName +isMusician city state videoLink")
                    .then(dbModel => dbModel.remove())
                    .then(dbModel => res.json(dbModel))
                    .catch(err => res.status(422).json(err));
         },
};
