var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;
var options = {discriminatorKey: 'kind', _id: false};
// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var InstrumentSchema = new Schema({
     instrument: {
          type: String,
          required: true,
          lowercase: true,
          trim: true
     },
     yearsExp: {
          type: Number,
          required: false,
     },
     userInfo: {
          type: Schema.Types.ObjectId,
          ref: "User"
     }
});
var PlayedInstrumentsSchema = new Schema(
     {
          instrumentStatus : {
               type: String,
               default: "Playable"
          }
     }, options);
var DesiredInstrumentsSchema = new Schema(
     {
          instrumentStatus : {
               type: String,
               default: "Desired"
          }
     }, options);
// This creates our model from the above schema, using mongoose's model method
var Instrument = mongoose.model("Instrument", InstrumentSchema);
var PlayedInstrument = Instrument.discriminator("PlayedInstrument", PlayedInstrumentsSchema);
var DesiredInstrument = Instrument.discriminator("DesiredInstrument", DesiredInstrumentsSchema);

// Export the Article model
module.exports = Instrument, PlayedInstrument, DesiredInstrument;
