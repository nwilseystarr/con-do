const Sequelize = require("sequelize");

const sequelize = require("../config/connection.js");

const Committee = sequelize.define("committee", {
    name: Sequelize.STRING
});

// Committee.hasMany(Event);

Committee.sync();

module.exports = Committee;