require("dotenv");
const router = require("express").Router();
const musiciansController = require("../../controller/musiciansController");
const musician = require('../../models/musicians');
//const passport = require('../../passport');

// Matches with "/api/musicians"
router.route(`/:APIkey=${process.env.APIkey}`)
  .get(musiciansController.search)
  .post(musiciansController.create);

// Matches with "/api/musicians/:id"
router
  .route(`/:id/:APIkey=${process.env.APIkey}`)
  .get(musiciansController.findById)
  .put(musiciansController.update)
  .delete(musiciansController.remove);

  router.post('/signup', (req, res) => {
    const {
      firstName,
      lastName,
      password,
      passwordConfirm,
      email,
      location,
      videoLink,
      experience,
      instrument
    } = req.body

    // ADD VALIDATION
    User.findOne({
      'local.email': email
    }, (err, userMatch) => {
      if (userMatch) {
        return res.json({
          error: `Sorry, already a user with the email: ${email}`
        })
      }
      const newUser = new User({
        'firstName': firstName,
        'lastName': lastName,
        'local.password': password,
        'videoLink': videoLink,
        'experience': experience,
        'instrument': instrument,
        'location': location,
        'local.email': email
      })
      newUser.save((err, savedUser) => {
        if (err) return res.json(err)
        return res.json(savedUser)
      })
    })
  })

module.exports = router;