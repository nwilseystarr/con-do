const Sequelize = require("sequelize");
const Committee = require("./committee");
const sequelize = require("../config/connection.js");

const Measure = sequelize.define("measure", {
    total_votes = Sequelize.INTEGER
})

Measure.belongsTo(Committee);

Measure.sync();

module.exports = Measure;