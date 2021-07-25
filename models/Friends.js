const nano = require("nanoid")
module.exports = function(sequelize, DataTypes){
    const UserToUser = sequelize.define("UserToUser", {
        socketId:{
            type: DataTypes.STRING,
            allowNull: false
        }

    })
    UserToUser.beforeCreate(async (user) => {
        this.socketId = nano.nanoid()
    })
   return UserToUser
}