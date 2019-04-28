const Sequelize = require("sequelize");
const School = require("./school");
const sequelize = require("../config/connection.js");

const School = sequelize.define("school", {
    name = Sequelize.STRING 
})

// School.hasMany(); - can reverse link to other tables

School.sync();

module.exports = School;