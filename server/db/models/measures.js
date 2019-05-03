const Sequelize = require("sequelize");
const db = require("../db");

    const Measure = db.define("measures", {
        total_votes: Sequelize.INTEGER
    })

    Measure.associate = function (models) {
        Measure.belongsTo(models.Committee);
    }


module.exports = Measure;