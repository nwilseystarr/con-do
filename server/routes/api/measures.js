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
router.route("/:measureId")
    .get(function(req, res){
        Measures.findOne({
            where:{
                id: req.params.measureId
            }
        })
        .then( function(returnedMeasure){
            res.send(returnedMeasure)
        })
    })
    .put(function(req, res){
        Measures.update(
            req.body,
            {
                where:{
                    id: req.params.measureId
                }
            }
        )
        .then(updatedMeasure =>{
            res.send(updatedMeasure)
        })
    })

router.route("/event/:eventId")
    .get(function (req, res){
        Measures.findAll({
            where:{
                eventId: req.params.eventId
            }
        })
        .then( (returnedMeasures)=>{
            console.log(returnedMeasures)
            res.send(returnedMeasures)
        })
    })
module.exports = router