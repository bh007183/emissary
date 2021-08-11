const {verifyToken} = require("../authentication")
const db = require("../models")
module.exports = async function(socket, next){
    let token = socket.handshake.auth.token

    try{
        let {userId} = await verifyToken(token)
        socket.on("DELETE_MESSAGE", async function(messageData){
           let data =  await db.Message.destroy({
                where:{
                    UserId: userId,
                    RoomId: messageData.roomId,
                    id: messageData.messageId
                    
                }
            })
            if(data){
                // delete item locally and in room
                socket.to(messageData.roomId).emit("REMOVE_DELETED_MESSAGE", {roomId: messageData.roomId, messageId: messageData.messageId})
                socket.emit("REMOVE_DELETED_MESSAGE", {roomId: messageData.roomId, messageId: messageData.messageId})

            }else{
                throw new Error("Unauthorized to delete this message")
            }





        })
    }catch(err){
        console.log(err.message)
        socket.emit("Error", err.message)
    }

  next()
}