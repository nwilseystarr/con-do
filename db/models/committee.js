module.exports = function (sequelize, DataTypes) {
    const Committee = sequelize.define("Committee", {
        name: DataTypes.STRING
    })
    return Committee;
};
