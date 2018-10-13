var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var BandsSchema = new Schema({
  name : {
     type: String,
     required: true
  },
  genre : {
     type: String,
     required: true
  },
  location : {
     type: String,
     required: true
  },
  instrumentsDesired: [{
    type: Schema.Types.ObjectId,
    ref: "Instrument"
  }],
  bandVideoUrl: {
       type: String,
       required: false,
       default: null
  },
  musicians: [{
    type: Schema.Types.ObjectId,
    ref: "Musician"
  }]
});

// This creates our model from the above schema, using mongoose's model method
var Band = mongoose.model("Band", BandsSchema);

// Export the Article model
module.exports = Band;
