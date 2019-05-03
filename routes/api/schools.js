const router = require("express").Router();
const schoolController = require("../../controllers/schoolController")
const passport = require("../../db/config/passport");
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");

router.route("/")
    .get(schoolController.all)
router.route("/:name")
    .get(schoolController.findByName)

module.exports = router;