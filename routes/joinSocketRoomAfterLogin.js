const {verifyToken} = require("../authentication")
const db = require("../models")
module.exports = async function(socket, next){
    let token = socket.handshake.auth.token

    try{
        let {userId} = await verifyToken(token)
        socket.on("joinRoom", async function(roomId){
          console.log("yetioasdfoasodfhadfhaosfhaodifjoadjfoasdjifoajdfoaof2387493749273984729898479")

            let data = await db.RoomToUser.findOne({
                where:{
                    UserId: userId,
                    RoomId: roomId
                }
            })
            console.log(data)
            console.log("this is where individuals join room")
            if(data){
                
                socket.join(roomId)

            }else{
                throw new Error("You are not authorized to access this conversation")
            }
            
        })

    }catch(err){
        socket.emit("Error", err.message)
    }

  next()
}