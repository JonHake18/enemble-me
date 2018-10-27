require("dotenv");
const db = require("../../models");
const User = db.User;
const router = require("express").Router();

function sendProfileLoadAck(req, res) {
    User.findById(req.user._id)
    .populate("instrumentsPlayed")
    .populate("instrumentsDesired")
    .then(user=>{
      res.status(200).json({
      message: "You're authorized to see this secret message.",
      // user values passed through from auth middleware	  
      user: user
      })
    })
    .catch(err=>{
      console.log(`Could not retrieve document with matching id:\n\t${err}`);
    })    
}
router.route('/')
  .get(sendProfileLoadAck);

module.exports = router;