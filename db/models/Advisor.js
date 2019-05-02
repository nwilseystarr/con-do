module.exports = function (sequelize) {
    const Advisor = sequelize.define("Advisor", {
    }) 


    Advisor.associate = function (models) {
        Advisor.belongsTo(models.School);
    }
    return Advisor
}