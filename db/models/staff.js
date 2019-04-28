const Sequelize = require("sequelize");
const Committee = require("./committee");
const sequelize = require("../config/connection.js");

const Committee_Staff = sequelize.define("committee_staff", {
    name = Sequelize.STRING,
    email = Sequelize.STRING,
})

Committee_Staff.belongsTo(Committee);

Committee_Staff.sync();

module.exports = Committee_Staff;