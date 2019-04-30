module.exports = function (sequelize, DataTypes) {
    const Measure = sequelize.define("Measure", {
        total_votes: DataTypes.INTEGER
    })

    Measure.associate = function (models) {
        Measure.belongsTo(models.Committee);
    }
    return Measure;
}
