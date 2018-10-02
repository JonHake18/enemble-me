var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var UserSchema = new Schema({
  username: {
     type: String,
     required: true
  },
  email: {
     type: String,
     unique: true,
     required: true
  },
  password: {
     type: String,
     required: true
  },
  isMusican: {
       type: Boolean,
       required: true
  },
  profile_Options: {
     type: Schema.Types.ObjectId,
     ref: "Options"
  },
  musicianInfo: {
     type: Schema.Types.ObjectId,
     ref: "Musician"
  },
  bandInfo: {
       type: Schema.Types.ObjectId,
       ref: "Band"
  }
});

// This creates our model from the above schema, using mongoose's model method
var User = mongoose.model("User", UserSchema);

// Export the Article model
module.exports = User;
