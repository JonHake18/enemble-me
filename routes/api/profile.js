require("dotenv");
const router = require("express").Router();

function sendProfileLoadAck(req, res) {

    res.status(200).json({
      message: "You're authorized to see this secret message.",
      // user values passed through from auth middleware
      user: req.user
    });
}
router.route('/')
  .get(sendProfileLoadAck);

module.exports = router;