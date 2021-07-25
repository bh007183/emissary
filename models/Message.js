module.exports = function(sequelize, DataTypes){
    const Message = sequelize.define("Room", {
        message:{
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    Message.associate = function(models){
        Message.belongsTo(models.User)
        Message.belongsTo(models.Room)
    }
    return Message
}
