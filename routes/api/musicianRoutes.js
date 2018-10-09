require("dotenv");
const router = require("express").Router();
const musiciansController = require("../../controller/musiciansController");

// Matches with "/api/musicians"
router.route(`/:APIkey=${process.env.APIkey}`)
  .get(musiciansController.findAll)
  .post(musiciansController.create);

// Matches with "/api/musicians/:id"
router
  .route(`/:id/:APIkey=${process.env.APIkey}`)
  .get(musiciansController.findById)
  .put(musiciansController.update)
  .delete(musiciansController.remove);

module.exports = router;