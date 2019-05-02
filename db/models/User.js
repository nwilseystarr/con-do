
const bcrypt = require("bcrypt-nodejs");

module.exports = (sequelize, DataTypes) =>{
    const User = sequelize.define("User", {
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false
        },
        name: {
            type: DataTypes.STRING,
            validate: {
                len: [5, 60]
            }
        },
        userType: {
            type: DataTypes.STRING,
            allowNull: false
        },
        country: {
            type: DataTypes.STRING,
        }
    });

    User.prototype.validPassword = function(password){
        return bcrypt.compareSync(password, this.password);
    }
    User.beforeCreate(function(user){
        user.password = bcrypt.hashSync(user.password, bcrypt.genSaltSync(10), null);
    })
    User.associate = function (models) {
        User.belongsTo(models.School);
        User.belongsTo(models.Committee);
    }
    return User;

}