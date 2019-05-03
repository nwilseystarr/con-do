const db = require("../db/models");
const router = require("express").Router();

module.exports = (app)=> {
    
//admin route to pull all attendance
    router.get("/api/attendance/admin", function (req, res) {
        db.conDO_db.findAll({where:{}}).then(function(attendance) {
            res.send(attendance);
            //need buttons on html side to sort data
        })
    })

    //faculty
    router.get("api/attendance/faculty", function (req, res) {
        db.conDO_db.findAll({
            where: {
            //faculty school matches student school
            }
        }).then(function (attendance) {
            res.send(attendance)
        })
    })

    router.get("api/attendance/staff", function (req, res) {
        db.conDO_db.findAll({
            where: {
            //staff committee === delegate committee
            }
        }).then(function (attendance) {
            res.send(attendance)
        })
    })

    router.put("api/attendance/delegate", function(req, res){
        db.conDO_db.update(
            { attendance: req.params.attend
            }, {
                where: req.params.id
            }
        ).then(function (rowsUpdated) {
            res.json(rowsUpdated)
        })
    })
}

