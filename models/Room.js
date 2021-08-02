


module.exports = function(sequelize, DataTypes){
    const Room = sequelize.define("Room", {
        id:{
            type: DataTypes.STRING ,
            unique: true,
            primaryKey: true
        },
        name:{
            type: DataTypes.STRING,
            allowNull: true
        }
        

    })
    
    Room.associate = function(models){
        Room.hasMany(models.Message)
        Room.belongsToMany(models.User, {As: "RoomToUser", through: "RoomToUser", onDelete: "cascade", hooks: true})
    }

    return Room
}

