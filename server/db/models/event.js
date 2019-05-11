const Sequelize = require("sequelize");
const Committee = require("./committee");
const db = require("../db");

//defines event model
const Event = db.define("event", {
    name: Sequelize.STRING,
    date: Sequelize.STRING,
    start: Sequelize.STRING,
    end: Sequelize.STRING,
    location: Sequelize.STRING,
    attendance: Sequelize.JSONB
})

Event.belongsTo(Committee);

module.exports = Event;
