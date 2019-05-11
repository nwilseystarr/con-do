const Sequelize = require("sequelize");
const db = require("../db");

//defines school model    
const School = db.define("school", {
        name: {
            type: Sequelize.STRING,
            allowNull: false,
            validate: {
                len: [1, 60]
            }
        } 
    })
   
module.exports = School;

