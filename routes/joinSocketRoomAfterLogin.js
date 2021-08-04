const {verifyToken} = require("../authentication")
const db = require("../models")
module.exports = async function(socket, next){
    let token = socket.handshake.auth.token

    try{
        let {userId} = await verifyToken(token)
        socket.on("joinRoom", async function(roomId){
          

            let data = await db.RoomToUser.findOne({
                where:{
                    UserId: userId,
                    RoomId: roomId
                }
            })
            if(data){
                socket.join(roomId)

            }else{
                throw new Error("You are not authorized to access this conversation")
            }
            
        })

    }catch(err){
        console.log(err.message)
        socket.emit("Error", err.message)
    }

  next()
}