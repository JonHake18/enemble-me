const router = require("express").Router();
const musiciansController = require("../../controllers/musiciansController");

// Matches with "/api/musicians"
router.route("/")
  .get(musiciansController.findAll)
  .post(musiciansController.create);

// Matches with "/api/musicians/:id"
router
  .route("/:id")
  .get(musiciansController.findById)
  .put(musiciansController.update)
  .delete(musiciansController.remove);

module.exports = router;