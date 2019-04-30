module.exports = function (sequelize, DataTypes) {
    const Committee_Staff = sequelize.define("committee_staff", {
        name = DataTypes.STRING,
        email = DataTypes.STRING,
    })


Committee_Staff.associate = function (models) {
    Committee_Staff.belongsTo(models.Committee_Staff);
}
    return Committee_Staff;

}