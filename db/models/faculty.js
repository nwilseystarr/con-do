module.exports = function (sequelize) {
    const Advisor = sequelize.define("advisor", {
    }) 


    Advisor.associate = function (models) {
        Advisor.belongsTo(models.School);
    }
    return Advisor
}