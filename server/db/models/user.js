const bcrypt = require("bcrypt-nodejs");
const Sequelize = require("sequelize");
const School = require("./School")
const Committee = require("./Committee")
const db = require("../db")

const User = db.define("user", {
    email: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true
        }
    },
    password: {
        type: Sequelize.STRING,
        allowNull: false
    },
    name: {
        type: Sequelize.STRING,
        validate: {
            len: [5, 60]
        }
    },
    userType: {
        type: Sequelize.STRING,
            allowNull: false
    },
    country: {
        type: Sequelize.STRING,
    }    
});
User.prototype.validPassword = function(password){
            return bcrypt.compareSync(password, this.password);
    }
User.beforeCreate(function(user){
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
})
User.beforeUpdate(function(user){
    user.password = bcypt.hashSync(user.password,  bcrypt.genSaltSync(10), null)
})    
    User.belongsTo(School);
    User.belongsTo(Committee);

module.exports = User;        