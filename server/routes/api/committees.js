const db = require("../../db/models");
const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op

// /api/committees/
router.route("/")
    //get all committees
    .get(function(req, res){
        db.Committee.findAll({})
            .then(committeData =>{
                res.send(committeData)
            })
    })
// /api/committees/queried/:query
router.route("/queried/:query")
    .get(function(req, res){
        //find all committee ids where the query is like the committee name
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
// /api/committees/:committeeId
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
// /api/committees/add
router.route("/add")
    //creating a new committe with a given name if the user is an admin or advisor
    .post(function (req, res) {
        if (req.user.userType === "admin" || req.user.userType === "advisor") {
            db.Committee.create(req.body)
                .then(committeeObj => {
                    res.send(committeeObj)
                })
        }
    })

module.exports = router;