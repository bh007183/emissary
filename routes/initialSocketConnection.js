const { verifyToken } = require("../authentication");
const db = require("../models");
const { Op} = require("sequelize");
const User = db.User

module.exports = async function (socket, next) {
  // Get Token
  const token = socket.handshake.auth.token;
  try {
    // Verify Token And Get User ID
    let {userId} = await verifyToken(token);
    
    // Get User 
    let userResponse = await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["password"],
      }
      
    }).catch((err) => {
      throw new Error(err.message)
      
    });
    
    
    
    // might delete
    //Get List of Friends
    let friends = await userResponse.getFriends({
      attributes: {
        exclude: [
          "password",
          "UserToUser",
          "createdAt",
          "updatedAt"
        ]
      }
    }).catch((err) => {
      throw new Error(err.message)
      
    });
   
    socket.join(userResponse.dataValues.socketId);

    //  If Has Friends, Send Array of friends
    if (friends.length) {
      socket.emit("Friends", friends)
    } else {
      throw new Error("HAHAHA YOU HAVE NO FRIENDS!!!!")
      
    }
    // Get actualRooms Accociated with User
    let rooms = await userResponse.getRooms().catch((err) => {
      throw new Error(err.message)
    });
    // Send actualRooms with Accociated User Names
      
       let parsedData = await db.Room.findAll({
        attributes: ["id", "name"],
        where:{
          [Op.or]:  rooms.map(function(room){return {id: room.dataValues.id}})
        },
        include:[{
          model: User,
          attributes: ["firstName", "lastName", "id"],
        through:{
          attributes: []
        }}]
      }).catch(err => socket.emit("Error", err.message))
      socket.join(parsedData.map(room => room.dataValues.id))
    socket.emit("SetRooms", {rooms: parsedData, userId: userId})
  } catch (err) {
    socket.emit("Error", err.message)
  }
  

  next();
};
