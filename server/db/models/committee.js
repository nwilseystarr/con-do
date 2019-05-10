const Sequelize = require("sequelize");
const db = require("../db");

//defines committee model    
const Committee = db.define("committee", {
        name: Sequelize.STRING 
    })
   
module.exports = Committee;

