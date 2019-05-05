const { Events, User } = require("../../db/models");
const router = require("express").Router();
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");

router.route("/")
    .get(function (req, res) {
        Events.findByPk(req.params.eventId)
    .then(function (event) {
        Events.findAll({})
            .then(function (users) {
            res.send(users)
        })
    })
})

router.route("/:committeeId")
    .get(function (req, res) {
        Events
    .findAll({
            where: {
                committeeId: req.params.committeeId
            }
        })
            .then(function (users) {
            res.send(users)
        })
    })

// router.route("")
//     .get(function (req, res) {
//         db.events.findAll({
//             where: {
//                 user: req.params.user
//             }
//         }).then(attendance => {
//             res.send(attendance)
//         })
//     })


module.exports = router;