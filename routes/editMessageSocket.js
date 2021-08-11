const { verifyToken } = require("../authentication");
const db = require("../models");

module.exports = async function(socket, next){
    let token = socket.handshake.auth.token
    try{
        const {userId, name} = await verifyToken(token)

        socket.on("EDIT_MESSAGE", async function(messageData){
            let data =  await db.Message.update(
              {message: messageData.message},{
                 where:{
                     UserId: userId,
                     RoomId: messageData.roomId,
                     id: messageData.messageId
                 }
             })
             if(data){
                 // Edit Item locally and in room
                 socket.to(messageData.roomId).emit("INSERT_EDITED_MESSAGE", {roomId: messageData.roomId, messageId: messageData.messageId, message: messageData.message})
                 socket.emit("INSERT_EDITED_MESSAGE", {roomId: messageData.roomId, messageId: messageData.messageId, message: messageData.message})
 
             }else{
                 throw new Error("Unauthorized to delete this message")
             }
 
 
 
          console.log(messageData)
 
         })

    }catch(err){
        console.log(err.message)
        socket.emit("Error", err.message)
    }
    next()
}
    
