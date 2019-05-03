//this file contains all api routes for users
//it uses the userController to relate to our database

const router = require("express").Router();
const userController = require("../../../controllers/userController")
const passport = require("../../../server/db/config/passport");
const isAuthenticated = require("../../../server/db/config/middleware/isAuthenticated");

// /api/users
router.route("/")
    .get(userController.getUserById)
    
// /api/users/signup    
router.route("/signup")
    .post(userController.create)

// /api/users/login
router.route("/login")
    .post(passport.authenticate("local"), userController.login)
router.route("/login/:token")
    .get(userController.linkLogin)

// /api/users/status
router.route("/status")
    .get(userController.status)

module.exports = router;