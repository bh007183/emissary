const { verifyToken } = require("../authentication");
const db = require("../models");
module.exports  = async function(socket, next){
    let token = socket.handshake.auth.token
    try{
        const {userId} = await verifyToken(token)
        socket.on("DISCONNECT", async function(disconnectId){
            let result = await db.UserToUser.destroy({
                where: {
                    UserId: userId,
                    FriendId: disconnectId
                }
            
            }) 
            
            if(!result){
                await db.UserToUser.destroy({
                    where: {
                        UserId: disconnectId,
                        FriendId: userId
                    }
    
                })

            }
            socket.emit("DISCONNECT_SUCCESS", disconnectId)
            
            
            
            

        })

    }catch(err){
        socket.emit("Error", err.message)
    }

    
    next()
}