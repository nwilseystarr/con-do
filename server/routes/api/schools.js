const db = require("../../db/models")
const router = require("express").Router();
const Sequelize = require("sequelize");
const Op = Sequelize.Op

router.route("/")
    .get(function(req, res){
        db.School.findAll({})
            .then(schoolData => {
                res.send(schoolData)
            })
    })
router.route("/queried/:query")
    .get(function(req, res){
        // console.log(req.params.query)
        db.School.findAll({
            attributes: ["id"],
            where: {
                name: {
                    [Op.like]: `%${req.params.query}%`
                }
            }
        })
        .then(queriedSchools =>{
            // console.log(queriedSchools)
            res.send(queriedSchools)
        })
    })
router.route("/:name")
    .get(function(req, res){
        db.School.findOne({
            where:{
                name: req.params.name
            }
        }).then(schoolData => {
            // console.log("school" + schoolData)
            res.send(schoolData) 
        });
    })
router.route("/add")
    .post(function (req, res) {
        if (req.user.userType === "admin") {
            db.School.create(req.body)
                .then(schoolObject => {
                    res.send(schoolObject)
                })
        }
    })

module.exports = router;