


module.exports = function(sequelize, DataTypes){
    const Room = sequelize.define("Room", {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        },
        socketId:{
            type: DataTypes.STRING ,
            unique: true
        }

    })
    
    Room.associate = function(models){
        Room.hasMany(models.Message)
        Room.belongsToMany(models.User, {through: "roomToUser", onDelete: "cascade", hooks: true})
    }

    return Room
}

