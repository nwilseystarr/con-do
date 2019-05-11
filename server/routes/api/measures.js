const { Measures,} = require("../../db/models");
const router = require("express").Router();


//get all events
router.route("/")
    .post(function (req, res){
        Measures.create(req.body)
            .then(function(createdMeasure){
                console.log(createdMeasure)
                res.send(createdMeasure)
            })
    })

module.exports = router