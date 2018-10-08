const db = require("../models");

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
          db.Musician
            .create(req.body)
            .then(dbModel => {
                  db.User
                  .findByIdAndUpdate(req.body.userInfo, 
                        {
                        musicianInfo: dbModel._id
                        })
                  .then(result=>{
                     res.json(result)   
                  })
                  .catch(error=> res.status(500).json(error));
            })
            .catch(err => res.status(422).json(err));
    },
    update: function(req, res) {
          db.Musician
            .findOneAndUpdate({ _id: req.params.id }, req.body)
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
    remove: function(req, res) {
          db.Musician
            .findById({ _id: req.params.id })
            .then(dbModel => dbModel.remove())
            .then(dbModel => res.json(dbModel))
            .catch(err => res.status(422).json(err));
      },
};
