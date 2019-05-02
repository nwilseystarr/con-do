module.exports = function (sequelize, DataTypes) {
    const School = sequelize.define("School", {
        name: DataTypes.STRING 
    })
    return School;
}


// School.hasMany(); - can reverse link to other tables
