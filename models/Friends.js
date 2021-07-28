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
    // UserToUser.beforeCreate(async (user) => {
    //     console.log("laosdfoalksdfjaosdhfniqfibaweifcaonisdfiufiuashnxifuahneiuqiwauexhohuew")
    //     let socketId = await nano.nanoid()
    //     console.log(socketId)
    //     user.socketId = socketId
    // })
   return UserToUser
}