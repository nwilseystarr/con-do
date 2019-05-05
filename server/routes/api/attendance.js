const { Events, User } = require("../../db/models");
const router = require("express").Router();
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");

router.route("/:eventId")
    .get(function (req, res) {
        Events.findByPk(req.params.eventId)
    .then(function (event) {
        User.findAll({
            where: {
                committeeId: event.committeeId
            }
        })
            .then(function (users) {
            res.send(users)
        })
            // res.send();
            //need buttons on html side to sort data
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