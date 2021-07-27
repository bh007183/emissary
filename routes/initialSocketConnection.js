const {verifyToken} = require("../authentication")
const db = require("../models")

module.exports = async function(socket, next){
    
        const token = socket.handshake.auth.token;
        try{
            console.log("inital middleware")
            let userId = await verifyToken(token)
            let userResponse = await db.User.findOne({
                where: {
                    id: userId
                },
                attributes:{
                    exclude: ["password"]
                }

            }).catch(err => {
                console.log(err)
                // socket.emit("Error", err)
            })
            console.log(userResponse)

            let friends = await userResponse.getFriends().catch(err => {
                console.log(err)
                // socket.emit("Error", err)
            })
            if(friends.length){

                let roomIds = await friends.filter(friend => friend.socketId)
                await socket.join(roomIds)

                roomIds.forEach(function(id){
                    ///check to see if how many in room?
                })
                      
            }else{
                socket.emit("Error", "HAHAHA YOU HAVE NO FRIENDS!!!!")
            }
            
            let rooms = await userResponse.getRooms().catch(err => {
                console.log(err)
                // socket.emit("Error", err)
            })
            console.log(rooms)

        }catch(err){
            
            console.log(err.message)
        }
        
        next()
    
}



