const bcrypt = require("bcrypt-nodejs");
const Sequelize = require("sequelize");
const School = require("./school")
const Committee = require("./committee")
const db = require("../db")

//creates user model for all users
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
    },
    firstLog: {
        type: Sequelize.BOOLEAN
    }
});
User.prototype.validPassword = function(password){
            return bcrypt.compareSync(password, this.password);
    }
User.beforeCreate(function(user){
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
})
User.beforeUpdate(function(user){
    // console.log("Calling before update", user)
    user.password = bcrypt.hashSync(user.password,  bcrypt.genSaltSync(10), null)
    // console.log(user.password)
})   
User.belongsTo(School);
User.belongsTo(Committee)

module.exports = User;        