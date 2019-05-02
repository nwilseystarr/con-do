module.exports = function (sequelize) {

const Staff = sequelize.define("Staff", {

})

Staff.associate = function (models) {
    Staff.belongsTo(models.Committee);
}
    return Staff;
}