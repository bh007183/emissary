const db = require("../models")
const nano = require("nanoid")
const { verifyToken } = require("../authentication");
const { Op} = require("sequelize");

module.exports = function(socket, next){
    const token = socket.handshake.auth.token;
    socket.on("create", async function(data){
        try{
            // Verify Proper Authorization //
            const {userId} = await verifyToken(token)
            // Create Room
            let roomCreated = await db.Room.create({
                id: nano.nanoid()
                // name: name optional
            })
            // Add Participents to Room
            let cloned = [{id: userId}, ...data]
           await Promise.all(cloned.map(async function(person){
                try{
                    await roomCreated.addUser(person.id)
                }catch(err){
                    socket.emit("Error", err.message)
                }
                
            }))
            

           // Retreaving room with Users and Parsing Data to Usable Response format
            let parsedData = await db.Room.findOne({
            attributes: ["id", "name"],
            where:{
              id: roomCreated.dataValues.id
            },
            include:[{
              model: db.User,
              attributes: ["firstName", "lastName", "id"],
            through:{
              attributes: []
            }}]
          }).catch(err => socket.emit("Error", err.message))
   
        
            // Parsing Data for retrieving UsertoUserSOcketIds
            let maped = await data.map(function(persons){
                return {FriendId: persons.id}
            })
            // Getting List Of Friends UsertoUserSocketIds
            let baseRoomIds = await db.UserToUser.findAll({
                where:{
                    [Op.or]: maped
                }
            })
            console.log(parsedData.dataValues.id)

            // need to join rooms 
            // Not sure how to make others join at this time.
            // socket.join(parsedData.dataValues.id)
            
            // Emitting Room Data and User Data to Users.
            baseRoomIds.forEach(person => {
                socket.to(person.dataValues.socketId).emit("RoomCreated", parsedData)
            })
            // Emitting Room Data and User Data to Self.
            socket.emit("RoomCreated", parsedData)

           
            
        }catch(err){
            console.log(err)
            socket.emit("Error", err.message)
        }

        
        
    
    })
    next()
}