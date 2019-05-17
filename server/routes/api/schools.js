const db = require("../../db/models")
const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op

// /api/schools/
router.route("/")
    //get all schools
    .get(function(req, res){
        db.School.findAll({})
            .then(schoolData => {
                res.send(schoolData)
            })
    })

// /api/schools/queried/:query
router.route("/queried/:query")
    .get(function(req, res){
        //find all schools with a name similar to the query and return their ids
        db.School.findAll({
            attributes: ["id"],
            where: {
                name: {
                    [Op.like]: `%${req.params.query}%`
                }
            }
        })
        .then(queriedSchools =>{
            
            res.send(queriedSchools)
        })
    })
// /api/schools/:name
router.route("/:name")
    .get(function(req, res){
        //find a school with an exactly matching name
        db.School.findOne({
            where:{
                name: req.params.name
            }
        }).then(schoolData => {
            res.send(schoolData) 
        });
    })
// /api/schools/add
router.route("/add")
    //add a new school
    .post(function (req, res) {
        if (req.user.userType === "admin") {
            db.School.create(req.body)
                .then(schoolObject => {
                    res.send(schoolObject)
                })
        }
    })

module.exports = router;