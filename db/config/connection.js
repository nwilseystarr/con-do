var Sequelize = require("sequelize");

// Creates mySQL connection using Sequelize, the empty string in the third argument spot is our password.
var sequelize = new Sequelize("sequelize_conDO", "root", "", {
    host: "localhost",
    port: 5432,
    dialect: "postgres",
    pool: {
      max: 5,
      min: 0,
      idle: 10000
    }
  });
  
module.exports = sequelize;