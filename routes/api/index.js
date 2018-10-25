const router = require("express").Router();
const userRoutes = require("./userRoutes.js");
const musicianRoutes = require("./musicianRoutes.js");
const bandRoutes = require("./bandRoutes.js");
const profileResponse = require('./profile.js');


router.use("/user", userRoutes);
router.use("/musicians", musicianRoutes);
router.use("/bands", bandRoutes);
router.use("/profile", profileResponse);

module.exports = router;
