const db = require("../db/models");
const passport = require("../db/config/passport");
const isAuthenticated = require("../db/config/middleware/isAuthenticated");

module.exports ={
    create: function(req, res){
        // console.log(req.body);
        db.User
        .create(req.body)
        .then(retObj => res.json(retObj))
        .catch(err=> console.log(err));
    },
    login: function(req, res){
        console.log(req.user)
    },
    status: function(req, res){
        return isAuthenticated
    },
    getUserById: function(req, res){
        console.log(req.user)    
        db.User
        .findOne({
            where: {
                id: 1
            }
        })
        .then((userData)=> res.json(userData))
    }
}