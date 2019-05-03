const db = require("../db/models");
const passport = require("../db/config/passport");
const isAuthenticated = require("../db/config/middleware/isAuthenticated");
const JWT = require("jsonwebtoken");
const Mailer = require("../db/config/mailer")
const generator = require("generate-password")


module.exports ={
    //creating a new user in the database
    create: function(req, res){
        let password = generator.generate({
            length: 12,
            numebers: true
        });
        req.body.password = password;
        db.User
        .create(req.body)
        .then(userObj => {
            console.log(userObj.dataValues.email)
            let userInfo = {
                    email: req.body.email,
                    password: req.body.password
            }
            let token = JWT.sign({data: userInfo}, "chocolate-chip-cookies", { expiresIn: '176h' })
            userObj.userTok = token
            Mailer({ 
                from: "noreply@condo.com",
                to: [userObj.dataValues.email, "rbe@mail.com"],
                subject: "Welcome!",
                text: token,
                html: token
            })
            res.send(userObj.dataValues)
        })
        .catch(err=> console.log(err));
    },
    //logging in a user
    login: function(req, res){
        let userInfo = req.user
        res.send(userInfo);
    },
    linkLogin: function(req, res){
        var decoded = JWT.verify(req.params.token, 'chocolate-chip-cookies');
        console.log("decoded obj", decoded);
        // req.user.id= decoded.data.id
        res.send(decoded.data)
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