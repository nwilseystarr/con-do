const db = require("../db/models");
const passport = require("../db/config/passport");
const isAuthenticated = require("../db/config/middleware/isAuthenticated");

module.exports ={
    //creating a new user in the database
    create: function(req, res){
        db.User
        .create(req.body)
        .then(retObj => res.json(retObj))
        .catch(err=> console.log(err));
    },
    //logging in a user
    login: function(req, res){
        let userInfo = req.user
        res.send(userInfo);
    },
    //checking the auth status of the user
    status: function(req, res){
        if(req.user){
            res.send(true)
        }
        else res.send(false);
    },
    //getting the user info for our logged in user agent
    getUserById: function(req, res){
        db.User
        .findOne({
            where: {
                id: req.user.id
            }
        })
        .then((userData)=> {
            //the user's permissions will be determined by their user type
            //their permissions will be added to the req.user object created by the passport session so 
            //that we can always verfiy on the backend if the user has permisssion to perform the inovked action
            //it is also referenced by the userData object that is being passed to react so permissions are available
            //on the front end as well
            switch (userData.userType){
                case "admin": 
                    req.user.permissions = {
                                C: ["admin create"],
                                R: ["admin read"],
                                U: ["admin update"],
                                D: ["admin delete"]
                    }
                break;
                case "delegate":
                    req.user.permissions = {
                            C: ["delegate create"],
                            R: ["delagate read"],
                            U: ["delagate update"],
                            D: ["delagate delete"]
                    }
                break;
            }
            //
            userData.dataValues.permissions = req.user.permissions;
            console.log(userData)
            res.send(userData)
        })
        .catch(err=> console.log(err.name + " " + err.message));
        
    }
}