const { verifyToken } = require("../authentication");
const db = require("../models");

module.exports = async function(socket, next){
    let token = socket.handshake.auth.token
    try{
        const {userId, name} = await verifyToken(token)
        socket.on("DELETE_ROOM", async function(roomid){
            let user = await db.User.findOne({
                where: {
                    id: userId
                }
            })
            if(user){
                await user.removeRoom(roomid)
            }else{
                throw new Error("Unable to remove User from this conversation")
            }
        })
        // If I want to notify other users that this person left room emit here
    

    }catch(err){
        socket.emit("Error", err.message)
    }
    next()
}
    
