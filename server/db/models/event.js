const Sequelize = require("sequelize");
const Committee = require("./committee");
const db = require("../db");

//defines event model
const Event = db.define("event", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 60]
        }
    },
    date: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    start: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    end: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    location: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            len: [1, 60]
        }
    },
    attendance: Sequelize.JSONB
})

Event.belongsTo(Committee);

module.exports = Event;
