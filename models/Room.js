


module.exports = function(sequelize, DataTypes){
    const Room = sequelize.define("Room", {
        name:{
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    
    Room.associate = function(models){
        Room.hasMany(models.Message)
        Room.belongsToMany(models.User, {through: "roomToUser", onDelete: "cascade", hooks: true})
    }

    return Room
}

