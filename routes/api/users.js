const router = require("express").Router();
const userController = require("../../controllers/userController")
const passport = require("../../db/config/passport");
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");

router.route("/signup")
    .post(userController.create)

router.route("/login")
    .post(passport.authenticate("local"), userController.login)

router.route("/status")
    .get(userController.status)

router
    .route("/")
    .get(userController.getUserById)

module.exports = router;