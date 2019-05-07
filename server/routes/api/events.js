const { Events, User } = require("../../db/models");
const router = require("express").Router();
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");

router.route("/:userId")
    .get(function (req, res) {
        User.findByPk(req.params.userId)
            .then(function (events) {
                Events.findAll({
                    where: {
                        committeeId: events.committeeId && 1000
                    }
                })
                    .then(function (events) {
                        res.send(events)
                    })
            })

    })

module.exports = router;