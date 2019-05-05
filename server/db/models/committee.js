const Sequelize = require("sequelize");
const db = require("../db");
    
const Committee = db.define("committee", {
        name: Sequelize.STRING 
    })
   
module.exports = Committee;

