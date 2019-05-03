const router = require("express").Router();
const committeeController = require("../../controllers/committeeController")
const passport = require("../../db/config/passport");
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");

router.route("/")
    .get(committeeController.all)
router.route("/:name")
    .get(committeeController.findByName)

module.exports = router;