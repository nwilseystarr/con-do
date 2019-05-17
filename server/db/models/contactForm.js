const Sequelize = require("sequelize");
const db = require("../db");

//creates model for the contact form
const Contact = db.define("contact", {
    name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
            isEmail: true,
        }
    },
    subject: {
        type: Sequelize.STRING,
        allowNull: false
    },
    message: {
        type: Sequelize.STRING,
        allowNull: false
    }
});

module.exports = Contact;  