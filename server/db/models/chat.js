const Sequelize = require("sequelize");
const db = require("../db")

//creates model for the chat
const Chat = db.define("chat", {
    name: {
        type: Sequelize.STRING,
        allowNull: false,
    },
    message: {
        type: Sequelize.STRING,
    }
});
module.exports = Chat;        