const {verifyToken} = require("../authentication")
const db = require("../models")

module.exports = async function(socket, next){

    const token = socket.handshake.auth.token;

    socket.on("acceptedConnection", async function(data){
        try{
            const {userId, name} = await verifyToken(token)
            // Flibbed data and userId as original setter was oposite
            await db.UserToUser.update({
                friendRequestAccepted: true
              },{
                  where:{
                UserId: data.id,
                FriendId: userId,

              }})

            socket.emit("Success", "Connection request sent.")
            socket.to(data.friendSocket).emit("Notification", {message: `${name} is now a connection`, friendId: userId, type: "CONNECTION_ACCEPTED"})
            // Below emit is Temporary to allow understanding of what im doing
            socket.emit("Notification", {message: `${name} is now a connection`, friendId: data, type: "CONNECTION_ACCEPTED"})

        }catch(err){
            console.log(err.message)
            socket.emit("Error", err.message)

        }
        


    })


next()
}