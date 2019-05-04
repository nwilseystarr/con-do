const db = require("../../db/models");
const router = require("express").Router();
const passport = require("../../db/config/passport");
const isAuthenticated = require("../../db/config/middleware/isAuthenticated");

router.route("/")
    .get(function(req, res){
        db.Committee.findAll({})
            .then(committeData =>{
                res.send(committeData)
            })
    })
router.route("/:name")
    .get(function(req, res){
        db.Committee.findOne({
            where:{
                name: req.params.name
            }
        }).then(committeData => {
            res.send(committeData) 
        })
    })

module.exports = router;