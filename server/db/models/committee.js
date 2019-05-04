const Sequelize = require("sequelize");
const db = require("../db");
// module.exports = function (sequelize, DataTypes) {
    
const Committee = db.define("committee", {
        name: Sequelize.STRING 
    })
   
module.exports = Committee;