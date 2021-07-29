const { verifyToken } = require("../authentication");
const db = require("../models");

module.exports = async function (socket, next) {
  const token = socket.handshake.auth.token;
  try {
    console.log("inital middleware");
    let userId = await verifyToken(token);
    let userResponse = await db.User.findOne({
      where: {
        id: userId,
      },
      attributes: {
        exclude: ["password"],
      },
    }).catch((err) => {
      socket.emit("Error", err)
    });
    console.log(userResponse);

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
      socket.emit("Error", err)
    });
    console.log(friends)
    if (friends.length) {
      socket.emit("Friends", friends)
      let roomIds = await friends.filter((friend) => friend.socketId);
      await socket.join(roomIds);

      roomIds.forEach(function (id) {
        ///check to see if how many in room?
      });
    } else {
      socket.emit("Error", "HAHAHA YOU HAVE NO FRIENDS!!!!");
    }
    let rooms = await userResponse.getRooms().catch((err) => {
      socket.emit("Error", err)
    });
    socket.emit("SetRooms", rooms)
  } catch (err) {
    socket.emit("Error", err)
  }
  

  next();
};
