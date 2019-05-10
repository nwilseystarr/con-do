const Sequelize = require("sequelize");
const Committee = require("./committee");
const db = require("../db");



    const Event = db.define("event", {
        name: Sequelize.STRING,
        date: Sequelize.STRING,
        start: Sequelize.STRING,
        end: Sequelize.STRING,
        group: Sequelize.STRING,
        location: Sequelize.STRING, 
        attendance: Sequelize.JSONB
    })

    Event.belongsTo(Committee);

module.exports = Event;
