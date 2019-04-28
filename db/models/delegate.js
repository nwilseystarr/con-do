const Sequelize = require("sequelize");
const Committee = require("./committee");
const School = require("./school");
const sequelize = require("../config/connection.js");

const Delegate = sequelize.define("delegate", {
    name = Sequelize.STRING,
    email = Sequelize.STRING,
    country = Sequelize.STRING
})

Delegate.belongsTo(School);
Delegate.belongsTo(Committee);

Delegate.sync();

module.exports = Delegate;