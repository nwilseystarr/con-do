const Sequelize = require("sequelize");
const db = require("../db")

//creates model for the chat
const Chat = db.define("chat", {
    name: {
        type: Sequelize.STRING,
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
});
module.exports = Chat;        