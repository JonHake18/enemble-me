require("dotenv");
const router = require("express").Router();
const userController = require("../../controller/userController.js");

// Matches with "/api/user"
router.route(`/APIkey=${process.env.APIkey}`)
  .get(userController.findAll)

// Matches with "/api/user/:id"
router
  .route(`/:id/APIkey=${process.env.APIkey}`)
  .get(userController.findById)
  .put(userController.update)
  .delete(userController.remove);

module.exports = router;