var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var BandsSchema = new Schema({
  Name : {
     type: String,
     required: true
  },
  Genre : {
     type: String,
     required: true
  },
  location : {
     type: String,
     required: true
  },
  instrumentsPlayed : [{
     instrument : {
          type: String,
     },
     yearsExp : {
          type: Number,
     }
  }],
  bandVideoUrl: {
       type: String,
       required: false,
       default: null
  },
  musicianInfo: {
    type: Schema.Types.ObjectId,
    ref: "Musician"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Bands = mongoose.model("Band", BandsSchema);

// Export the Article model
module.exports = Bands;
