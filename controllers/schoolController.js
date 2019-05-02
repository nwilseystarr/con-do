const db = require("../db/models");
const passport = require("../db/config/passport");
const isAuthenticated = require("../db/config/middleware/isAuthenticated");

module.exports ={
    findByName: function(req, res){
        db.School.findOne({
            where:{
                name: req.params.name
            }
        }).then(schoolData => {
            console.log("school" + schoolData)
            res.send(schoolData) 
        });
    }
}