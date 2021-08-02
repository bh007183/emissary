
module.exports = function(sequelize, DataTypes){
    const RoomToUser = sequelize.define("RoomToUser", {
        UserId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        UserId: {
            type: DataTypes.STRING,
            allowNull: false
        }


    }
    )
   return RoomToUser
}