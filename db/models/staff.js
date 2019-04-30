module.exports = function (sequelize) {
    const Committee_Staff = sequelize.define("committee_staff", {
    })


Committee_Staff.associate = function (models) {
    Committee_Staff.belongsTo(models.Committee_Staff);
}
    return Committee_Staff;

}