const Sequelize = require("sequelize");
const Event = require("./event")
const db = require("../db");

//defines measure model
const Measure = db.define("measure", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 60]
        }
    },
    voteTally: Sequelize.JSONB,
    result : Sequelize.BOOLEAN,
    measureType: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 60]
        }
    },
    open : Sequelize.BOOLEAN,
})

Measure.belongsTo(Event);



module.exports = Measure;