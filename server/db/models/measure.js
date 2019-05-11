const Sequelize = require("sequelize");
const Event = require("./event")
const db = require("../db");

//defines measure model
const Measure = db.define("measure", {
    name: Sequelize.STRING,
    voteTally: Sequelize.JSONB,
    result : Sequelize.BOOLEAN,
    measureType: Sequelize.STRING,
    open : Sequelize.BOOLEAN,
})

Measure.belongsTo(Event);



module.exports = Measure;