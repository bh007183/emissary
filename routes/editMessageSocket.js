const { verifyToken } = require("../authentication");
const db = require("../models");

module.exports = async function (socket, next) {
  let token = socket.handshake.auth.token;
  try {
    const { userId, name } = await verifyToken(token);

    socket.on("EDIT_MESSAGE", async function (messageData) {
      console.log(messageData)
      let data = await db.Message.update(
        { message: messageData.message,
        giff: messageData.giff },
        {
          where: {
            UserId: userId,
            RoomId: messageData.roomId,
            id: messageData.messageId,
          },
        }
      );
      if (data) {
        // Edit Item locally and in room
        socket
          .to(messageData.roomId)
          .emit("INSERT_EDITED_MESSAGE", {
            roomId: messageData.roomId,
            messageId: messageData.messageId,
            message: messageData.message,
            giff: messageData.giff
          });
        socket.emit("INSERT_EDITED_MESSAGE", {
          roomId: messageData.roomId,
          messageId: messageData.messageId,
          message: messageData.message,
          giff: messageData.giff
        });
      } else {
        throw new Error("Unauthorized to delete this message");
      }
    });
  } catch (err) {
    socket.emit("Error", err.message);
  }
  next();
};
