const { Measures,} = require("../../db/models");
const router = require("express").Router();


// /api/measures/
router.route("/")
    //create a new measure
    .post(function (req, res){
        Measures.create(req.body)
            .then(function(createdMeasure){
                console.log(createdMeasure)
                res.send(createdMeasure)
            })
    })

// /api/measures/:measureId
router.route("/:measureId")
    //get the measure that has a matching id
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
    //update the measure with the matching id
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
// /api/measures/event/:eventId
router.route("/event/:eventId")
    //find all measures with a matching eventId
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