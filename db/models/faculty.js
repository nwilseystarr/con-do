const Sequelize = require("sequelize");
const School = require("./school");
const sequelize = require("../config/connection.js");

const Advisor = sequelize.define("advisor", {
    name = Sequelize.STRING,
    email = Sequelize.STRING
})

Advisor.belongsTo(School);

Advisor.sync();

module.exports = Advisor;