const Sequelize = require("sequelize");
const db = require("../db");

//defines measure model
const Measure = db.define("measure", {
    total_votes: Sequelize.INTEGER
})

Measure.associate = function (models) {
    Measure.belongsTo(models.Committee);
}


module.exports = Measure;