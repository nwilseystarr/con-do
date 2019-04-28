const Sequelize = require("sequelize");
const sequelize = require("../config/connection.js");

const Admin = sequlize.define("admin", {
    name = Sequelize.STRING,
    email = Sequelize.STRING
})

Admin.sync();

module.exports = Admin;