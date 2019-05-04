const db = require("../../db/models");
const router = require("express").Router();


//admin route to pull all attendance
    router.route.get("/admin", function (req, res) {
        db.events.findAll({}).then(function(attendance) {
            res.send(attendance);
            //need buttons on html side to sort data
        })
    })

    //faculty
    router.route.get("/faculty", function (req, res) {
        db.attendance.findAll({
            where: {
            //faculty school matches student school
            }
        }).then(function (attendance) {
            res.send(attendance)
        })
    })

    router.route.get("/staff", function (req, res) {
        db.events.findAll({
            where: {
            //staff committee === delegate committee
            }
        }).then(function (attendance) {
            res.send(attendance)
        })
    })

    router.route.put("/delegate", function(req, res){
        db.eventss.update(
            { attendance: req.params.attend
            }, {
                where: req.params.id
            }
        ).then(function (rowsUpdated) {
            res.json(rowsUpdated)
        })
    })

module.exports = router;

