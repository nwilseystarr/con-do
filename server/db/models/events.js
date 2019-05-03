const Sequelize = require("sequelize");
const db = require("../db");


    const Events = db.define("events", {
        eventName: Sequelize.STRING,
        eventDate: Sequelize.STRING,
        eventTimeStart: Sequelize.STRING,
        eventTimeEnd: Sequelize.STRING,
        eventCommittee: Sequelize.STRING,
        eventGroup: Sequelize.STRING,
        eventLocation: Sequelize.STRING, 
        eventAttendance: Sequelize.JSON
    })

module.exports = Events;
