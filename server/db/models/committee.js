const Sequelize = require("sequelize");
const db = require("../db");
const User = require("./user");
const Events = require("./event");
    
const Committee = db.define("committee", {
        name: Sequelize.STRING 
    })

    User.belongsTo(Committee);
    Committee.hasMany(User);

    Committee.hasMany(Events);
    Events.belongsTo(Committee);
   
module.exports = Committee;

