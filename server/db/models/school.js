const Sequelize = require("sequelize");
const db = require("../db");


// module.exports = function (sequelize, DataTypes) {
    
const School = db.define("schools", {
        name: Sequelize.STRING 
    })
   
module.exports = School;


// School.hasMany(); - can reverse link to other tables
