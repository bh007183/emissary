const db = require("../models")
const nano = require("nanoid")
const { verifyToken } = require("../authentication");
const { Op, or } = require("sequelize");

module.exports = function(socket, next){
    const token = socket.handshake.auth.token;
    socket.on("create", async function(data){
        try{
            // Verify Proper Authorization //
            const id = await verifyToken(token)
            // Create Room?
            let roomCreated = await db.Room.create({
                id: nano.nanoid()
            })
            // Add Participents to Room
            let cloned = [{id: id}, ...data]
           await cloned.forEach(function(person){
                try{
                    roomCreated.addUser(person.id)
                }catch(err){
                    console.log(err)
                }
                
            })
            // Parsing Data to Usable format
            let maped = await data.map(function(persons){
                return {FriendId: persons.id}
            })
            // Getting List Of Friends BaseSocketIds
            let baseRoomIds = await db.UserToUser.findAll({
                where:{
                    [Op.or]: maped
                }
            })
            console.log(data)
            // Emitting Room Data and User Data to Users.
            baseRoomIds.forEach(person => {
                socket.to(person.dataValues.socketId).emit("RoomCreated", {connections: data, room: roomCreated.dataValues})
            })
            // Emitting Room Data and User Data to Self.
            socket.emit("RoomCreated", {connections: data, room: roomCreated.dataValues})

           
            
        }catch(err){
            console.log(err)
            socket.emit("Error", err.message)
        }

        
        
    
    })
    next()
}