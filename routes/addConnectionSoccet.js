const {verifyToken} = require("../authentication")
const db = require("../models")
const nano = require("nanoid")
module.exports = async function(socket, next){

    const token = socket.handshake.auth.token;

    socket.on("addConnection", async function(data){
        try{
            const {userId} = await verifyToken(token)
            
            await db.UserToUser.create({
                UserId: userId,
                FriendId: data.friendId,
              })

            socket.emit("Success", "Connection request sent.")
            socket.to(data.friendSocket).emit("Notification", {message: `${data.friendName} sent a connection request`, friendId: data.friendId, type: "CONNECTION_REQUEST"})
            // Below emit is Temporary to allow understanding of what im doing
            // socket.emit("Notification", {message: `${data.friendName} sent a connection request`, friendId: data.friendId, type: "CONNECTION_REQUEST"})

        }catch(err){
            console.log(err.message)
            socket.emit("Error", err.message)

        }
        


    })


next()
}