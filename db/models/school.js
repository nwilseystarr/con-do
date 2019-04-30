module.exports = function (sequelize, DataTypes) {
    const School = sequelize.define("school", {
        name = DataTypes.STRING 
    })
    return School;
}


// School.hasMany(); - can reverse link to other tables
