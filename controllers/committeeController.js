const db = require("../db/models");
const passport = require("../db/config/passport");
const isAuthenticated = require("../db/config/middleware/isAuthenticated");

module.exports ={
    findByName: function(req, res){
        db.Committee.findOne({
            where:{
                name: req.params.name
            }
        }).then(committeData => {
            console.log("committeData " + committeData)
            res.send(committeData) 
        });
    }
}