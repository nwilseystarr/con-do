const fs = require("fs");
const path = require("path");
const Sequelize = require("sequelize");
const basename = path.basename(module.filename);
const env = process.env.NODE_ENV || "development";
const config = require(__dirname + "/../config/config.json")[env];

const db = {};

if (config.use_env_variable) {
    let sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
    let sequelize = new Sequelize(config.database, config.username, config.password, config);
}

//fs?

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;