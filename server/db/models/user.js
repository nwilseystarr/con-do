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
    },
    firstLog: {
        type: Sequelize.BOOLEAN
    },
    // attendance: [
    //     //array of integers (eventIDs tied to delegates only, viewable to other users)
            //when a user is present at an event you would push the event id to this array so that 
            //if index of this event is >-1 the user was present, if the eventID is not in this array the user is nto present
    // ]
});
User.prototype.validPassword = function(password){
            return bcrypt.compareSync(password, this.password);
    }
User.beforeCreate(function(user){
    user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
})
User.beforeUpdate(function(user){
    console.log("Calling before update", user)
    user.password = bcrypt.hashSync(user.password,  bcrypt.genSaltSync(10), null)
    console.log(user.password)
})   
    User.belongsTo(School);
    User.belongsTo(Committee);

module.exports = User;        