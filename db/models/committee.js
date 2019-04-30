module.exports = function (sequelize, DataTypes) {
    const Committee = sequelize.define("committee", {
        name: DataTypes.STRING
    })
    return Committee;
};
