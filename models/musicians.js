var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var MusicianSchema = new Schema({
  firstName: {
     type: String,
     required: true
  },
  lastName: {
     type: String,
     required: true
  },
  genre: {
    type: String,
    required: false,
  },
  location: {
     type: String,
     required: true
  },
  instrumentsPlayed: [{
    type: Schema.Types.ObjectId,
    ref: "Instrument"
  }],
  videoUrl: {
    type: String,
    required: false,
    default: null
  },
  userInfo: {
     type: Schema.Types.ObjectId,
     ref: "User"
  }
});

// This creates our model from the above schema, using mongoose's model method
var Musician = mongoose.model("Musician", MusicianSchema);

// Export the Article model
module.exports = Musician;
