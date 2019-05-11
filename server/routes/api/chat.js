const db = require("../../db/models");
const router = require("express").Router();

router.route("/messages")
    .get(function (req, res){
        db.Message.findAll({}) 
        .then(messageData => {
            res.send(messageData)
        })    
    })

router.route("/messages")
    .post(function (req, res){
        db.Message.save((err) =>{
            if(err)
                sendStatus(500);
            res.sendStatus(200);
        })
    })    

module.exports = router;