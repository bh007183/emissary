const nano = require("nanoid")
module.exports = function(sequelize, DataTypes){
    const UserToUser = sequelize.define("UserToUser", {
        socketId:{
            type: DataTypes.STRING,
            allowNull: false
        },
        friendRequestAccepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }


    }
    )
   return UserToUser
}