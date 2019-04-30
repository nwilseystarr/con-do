module.exports = function (sequelize, DataTypes) {
    const Events = sequelize.define("event", {
        eventName = DataTypes.STRING,
        eventDate = DataTypes.STRING,
        eventTimeStart = DataTypes.INTEGER,
        eventTimeEnd = DataTypes.INTEGER,
        eventCommittee = DataTypes.STRING,
        eventGroup = DataTypes.STRING,
        eventLocation = DataTypes.STRING
    })
    return Events;
}

