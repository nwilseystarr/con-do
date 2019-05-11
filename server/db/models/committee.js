const Sequelize = require("sequelize");
const db = require("../db");

//defines committee model    
const Committee = db.define("committee", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            len: [1, 60]
        }
    }
    })
   
module.exports = Committee;

