const db = require("../../db/models");
const router = require("express").Router();
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");


router.route("/")
    .get(function (req, res) {
        db.events.findAll({
            
        }).then(function(attendance) {
            res.send(attendance);
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