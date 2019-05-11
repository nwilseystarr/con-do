const db = require("../../db/models");
const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op

router.route("/")
    .get(function(req, res){
        db.Committee.findAll({})
            .then(committeData =>{
                res.send(committeData)
            })
    })
router.route("/queried/:query")
    .get(function(req, res){
        // console.log(req.params.query)
        db.Committee.findAll({
            attributes: ['id'],
            where: {
                name: {
                    [Op.like]: `%${req.params.query}%`
                }
            }
        })
        .then(queriedCommittees =>{
            // console.log(queriedCommittees)
            res.send(queriedCommittees)
        })
    })
router.route("/:committeeId")
    .get(function(req, res){
        db.Committee.findOne({
            where:{
                id: req.params.committeeId
            }
        }).then(committeData => {
            res.send(committeData) 
        })
    })
router.route("/add")
    .post(function (req, res){
        db.Committee.create(req.body)
        .then(committeeObj =>{
            res.send(committeeObj)
        })
    })

module.exports = router;