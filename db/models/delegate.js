module.exports = function (sequelize, DataTypes) {
    const Delegate = sequelize.define("delegate", {
        country = DataTypes.STRING
    })
    Delegate.associate = function (models) {
        Delegate.belongsTo(models.School);
        Delegate.belongsTo(models.Committee);
    }
    return Delegate;
}
