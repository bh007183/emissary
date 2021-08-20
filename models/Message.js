module.exports = function(sequelize, DataTypes){
    const Message = sequelize.define("Message", {
        message:{
            type: DataTypes.STRING,
            allowNull: false
        },
        author: {
            type: DataTypes.STRING,
            allowNull: false
        },
        giff: {
            type: DataTypes.STRING,
        }

    })
    Message.associate = function(models){
        Message.belongsTo(models.User)
        Message.belongsTo(models.Room)
    }
    return Message
}
