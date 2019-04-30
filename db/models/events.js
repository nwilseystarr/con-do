const Sequelize = require("sequelize");

const sequelize = require("../config/connection.js");

const Events = sequelize.define("event", {
    eventName = Sequelize.STRING,
    eventDate = Sequelize.STRING,
    eventTime = Sequelize.INTEGER,
    eventCommittee = Sequelize.STRING,
    eventGroup = Sequelize.STRING,
    eventLocation = Sequelize.STRING
})

Events.sync();

module.exports = Events;