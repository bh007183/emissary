const nano = require("nanoid")
module.exports = function(sequelize, DataTypes){
    const UserToUser = sequelize.define("UserToUser", {
        
        friendRequestAccepted: {
            type: DataTypes.BOOLEAN,
            defaultValue: false
        }


    }
    )
   return UserToUser
}