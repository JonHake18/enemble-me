var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model

var BandsSchema = new Schema({
  bandName : {
     type: String,
     required: true
  },
  musicGenre : {
     type: String,
     required: true
  },
  location : {
     type: String,
     required: true
  },
  instrument : {
      type: String,
  },
  experience: {
       type: String,
       required: false,
       default: null
  },
  videoLink: {
    type: String,
    required: false,
    default: null
  },
  bandDescription: {
    type: Schema.Types.ObjectId,
    ref: "Musician"
  },
  local: {
		email: { type: String, unique: false, required: false },
		password: { type: String, unique: false, required: false }
	},
});

// This creates our model from the above schema, using mongoose's model method
var Bands = mongoose.model("Band", BandsSchema);

// Export the Article model
module.exports = Bands;
