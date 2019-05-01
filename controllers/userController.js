const db = require("../db/models");
const passport = require("../db/config/passport");
const isAuthenticated = require("../db/config/middleware/isAuthenticated");

module.exports ={
    create: function(req, res){
        db.User
        .create(req.body)
        .then(retObj => res.json(retObj))
        .catch(err=> console.log(err));
    },
    login: function(req, res){
        let userInfo = req.user
        res.send(userInfo);
    },
    status: function(req, res){
        return isAuthenticated
    },
    getUserById: function(req, res){
        db.User
        .findOne({
            where: {
                id: req.user.id
            }
        })
        .then((userData)=> {
            res.send(userData)
        })
        .catch(err=> console.log(err.name + " " + err.message));
        
    }
}