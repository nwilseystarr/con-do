//this file contains all api routes for users
//it uses the userController to relate to our database
require("dotenv").config()
const db = require("../../db/models");
const router = require("express").Router();
const passport = require("../../db/config/passport/");
const JWT = require("jsonwebtoken");
const generator = require("generate-password")
const sgMail = require("@sendgrid/mail");

console.log("environ ", process.env.SENDGRID_API_KEY)
const Sequelize = require("sequelize");
const Op = Sequelize.Op
const mailer = require("../../db/config/mailer")


// /api/users aka getting the logged in user by checking the req.user Obj
router.route("/")
    .get(function(req, res){
        db.User
        .findOne({
            attributes: {exclude: ["password"]},
            where: {
                id: req.user.id
            }
        })
        .then((userData)=> {
            res.send(userData)
        })
        .catch(err=> console.log(err.name + " " + err.message));
    })
// /api/users/all
router.route("/all")
    //get all users
    .get(function(req, res){
        db.User
        .findAll({attributes: {exclude: ["password"]},})
        .then( (usersData) =>{
            res.send(usersData)
        })
    })
// /api/users/querybyname/:query
router.route("/querybyname/:query")
    //get all users with  a name similar to the query
    .get(function(req, res){
        db.User.findAll({
            attributes: {exclude: ["password"]},
            where: {
                name: {
                    [Op.like]: `%${req.params.query}%`
                }
            }
        })
        .then(queriedUsers =>{
            res.send(queriedUsers)
        })
    })
// /api/users/querybycommittee/:query find all users with a matching committeeId
router.route("/querybycommittee/:query")
    .get(function(req,res){
        db.User.findAll({
            attributes: {exclude: ["password"]},
            where: {
                committeeId: req.params.query
            }
        })
        .then(queriedUsers =>{
            // console.log("committee users,", queriedUsers)
            res.send(queriedUsers)
        })
    })
// /api/querybyschool/:query
router.route("/querybyschool/:query")
    //find all schools with a matching schoolid
    .get(function(req,res){
        db.User.findAll({
            attributes: {exclude: ["password"]},
            where: {
                schoolId: req.params.query
            }
        })
        .then(queriedUsers =>{
            // console.log("committee users,", queriedUsers)
            res.send(queriedUsers)
        })
    })
// /api/users/create    
router.route("/create")
    .post(function(req, res){
        //checking to make sure the user is an admin or advisor
        if(req.user.userType ==="admin" || req.user.userType ==="advisor"){
            //generating a random password for the user
            let password = generator.generate({
                length: 12,
                numebers: true
            });
            //adding the generated password to our request object and the firstLogin status which 
            //will force the user to update their password on their first login
            req.body.password = password;
            req.body.firstLog = true;
            //advisors can only add delegate accounts for their school, so the properties will be provided here
            if(req.user.userType === "advisor")
            {
                req.body.schoolId = req.user.schoolId;
                req.body.userType = "delegate"
            }
            //create the new user
            db.User
            .create(req.body)
            .then(userObj => {
                // console.log(userObj.dataValues.email)
                //storing the info for the user being created into an object so that it can be emailed to the user via a jsonwebtoken
                //the user will then be logged in with passport
                let userInfo = {
                        email: req.body.email,
                        password: req.body.password
                }
                let token = JWT.sign({data: userInfo}, process.env.JWT_SECRET || "chocolate-chip-cookies", { expiresIn: "176h" })
                // console.log(token)

                mailer.sendMail(req.body.name, req.body.email, token)
                res.send(userObj.dataValues)
            })
            .catch(err=> console.log(err));
        }
    })

// /api/users/login
router.route("/login")
    .post(passport.authenticate("local",{ failureRedirect: '/login'}), function(req, res){
        console.log("logging in")
        let userInfo = req.user
        res.send(userInfo);
    })
// /api/users/login/:token
router.route("/login/:token")
    //attempt to login a user with their json web token
    .get(function(req, res){
        var decoded = JWT.verify(req.params.token, process.env.JWT_SECRET || "chocolate-chip-cookies");
        // console.log("decoded obj", decoded);
        res.send(decoded.data)

    })
// /api/users/logout
router.route("/logout")
    .post(function(req, res){
        req.logout()
        res.redirect("/")
    })
// /api/users/updatepw
router.route("/updatepassword")
    .put(function (req, res) {
        db.User
            .update(
                req.body,
                {
                    where:{
                        id: req.user.id
                    }, 
                    individualHooks: true
                })
            .then(userObj =>{
                res.send(userObj)
            })
    })
// /api/users/id
router.route("/:userId")
    .delete(function (req, res) {
        if (req.user.userType === "admin" || req.user.userType === "advisor") {
        db.User
            .destroy({
                where:{
                    id: req.params.userId
                }
            })
        .then(deleted =>{
            res.end()
        })          
        }
    })
// /api/users/my
router.route("/my")
    //if the user is an advisor it will return all users that have a matching school id
    .get(function(req, res){
        if(req.user.userType === "advisor"){
            db.User
            .findAll({
                attributes: {exclude: ["password"]},
                where:{
                    schoolId: req.user.schoolId
                }
            }).then(schoolUsers =>{
                res.send(schoolUsers)
            })
        }
        //else if the user is an admin they will be given all users
        else if(req.user.userType === "admin"){
            db.User
            .findAll({attributes: {exclude: ["password"]},})
            .then(schoolUsers =>{
                res.send(schoolUsers)
            })
        }

    })
module.exports = router;