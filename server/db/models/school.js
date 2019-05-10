const Sequelize = require("sequelize");
const db = require("../db");

//defines school model    
const School = db.define("school", {
        name: Sequelize.STRING 
    })
   
module.exports = School;

