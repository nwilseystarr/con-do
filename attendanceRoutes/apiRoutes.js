const db = require("../db/models");
const path = require("path");

module.exports = function (app) {
    
//admin route to pull all attendance
    app.get("/api/attendance/admin", function (req, res) {
        db.conDO_db.findAll({where:{}}).then(function(attendance) {
            res.send(attendance);
            //need buttons on html side to sort data
        })
    })

    //faculty
    app.get("api/attendance/faculty", function (req, res) {
        db.conDO_db.findAll({where:{}})
    })
}

