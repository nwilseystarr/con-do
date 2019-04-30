module.exports = function (sequelize, DataTypes) {
    const Advisor = sequelize.define("advisor", {
        name = DataTypes.STRING,
        email = DataTypes.STRING
    }) 


    Advisor.associate = function (models) {
        Advisor.belongsTo(models.School);
    }
    return Advisor
}