const router = require("express").Router();
const schoolController = require("../../../controllers/schoolController")
const passport = require("../../../server/db/config/passport");
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");

router.route("/")
    .get(function(req, res){
        db.School.findAll({})
            .then(schoolData => {
                res.send(schoolData)
            })
    })
router.route("/:name")
    .get(function(req, res){
        db.School.findOne({
            where:{
                name: req.params.name
            }
        }).then(schoolData => {
            console.log("school" + schoolData)
            res.send(schoolData) 
        });
    })

module.exports = router;