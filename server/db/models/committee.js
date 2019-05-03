const Sequelize = require("sequelize");
const db = require("../db");
// module.exports = function (sequelize, DataTypes) {
    
const Committee = db.define("Committee", {
        name: Sequelize.STRING 
    })
   
module.exports = Committee;