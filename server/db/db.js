const path = require("path");
const Sequelize = require("sequelize");
const env = process.env.NODE_ENV || "development";
const databaseName = "condo_db";

//intializes db
const db = new Sequelize(
  process.env.DATABASE_URL || `postgres://root:password@localhost:5432/${databaseName}`,
  {
    logging: false
  }
)

module.exports = db;

