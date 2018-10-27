require("dotenv");
const db = require("../../models");
const User = db.User;
const router = require("express").Router();

function sendProfileLoadAck(req, res) {
<<<<<<< HEAD
     User.findById(req.user._id)
=======
    User.findById(req.user._id)
>>>>>>> 2d9ecb57d3772b25d6e5c7b63959918c8665ffd4
    .populate("instrumentsPlayed")
    .populate("instrumentsDesired")
    .then(user=>{
      res.status(200).json({
      message: "You're authorized to see this secret message.",
<<<<<<< HEAD
      // user values passed through from auth middleware	  
      user: user
      })
    })
    .catch(err=>{
      console.log(`Could not retrieve document with matching id:\n\t${err}`);
    })    
=======
      // user values passed through from auth middleware
      user: user
    });
    })
>>>>>>> 2d9ecb57d3772b25d6e5c7b63959918c8665ffd4
}
router.route('/')
  .get(sendProfileLoadAck);

module.exports = router;