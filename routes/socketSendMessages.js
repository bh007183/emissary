const { verifyToken } = require("../authentication");
const db = require("../models");
module.exports = async function (socket, next) {
  const token = socket.handshake.auth.token;
  try {
    let { userId, name } = await verifyToken(token);

    socket.on("sendMessage", async function (data) {
      let user = await db.RoomToUser.findOne({
        where: {
          RoomId: data.roomId,
          UserId: userId,
        },
      });
      if (user) {
        let stuff = await db.Message.create({
          message: data.message,
          UserId: userId,
          RoomId: data.roomId,
          author: name,
        });
        console.log(data.roomId)
        socket.to(data.roomId).emit("messageTransmit", stuff);
        socket.emit("messageTransmit", stuff);
      }
    });
  } catch (err) {
    socket.emit("Error", err.message);
  }

  next();
};
