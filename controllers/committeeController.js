const db = require("../db/models");
const passport = require("../db/config/passport");
const isAuthenticated = require("../db/config/middleware/isAuthenticated");

module.exports ={
    all: function(req, res){
        db.Committee.findAll({})
            .then(committeData =>{
                res.send(committeData)
            })
    },
    findByName: function(req, res){
        db.Committee.findOne({
            where:{
                name: req.params.name
            }
        }).then(committeData => {
            res.send(committeData) 
        });
    }
}