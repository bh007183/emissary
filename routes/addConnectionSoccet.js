const { verifyToken } = require("../authentication");
const db = require("../models");
const nano = require("nanoid");
module.exports = async function (socket, next) {
  const token = socket.handshake.auth.token;

  socket.on("addConnection", async function (data) {
    try {
      const { userId, name, socketId } = await verifyToken(token);

      await db.UserToUser.create({
        UserId: userId,
        FriendId: data.friendId,
      });

      socket.emit("Success", "Connection request sent.");
      socket
        .to(data.friendSocket)
        .emit("Notification", {
          message: `${name} sent a connection request`,
          friendId: toString(userId),
          recipeantSocketId: socketId,
          type: "CONNECTION_REQUEST",
        });
      // Below emit is Temporary to allow understanding of what im doing
      // socket.emit("Notification", {message: `${data.friendName} sent a connection request`,recipeantSocketId: data.friendSocket, friendId: data.friendId, type: "CONNECTION_REQUEST"})
    } catch (err) {
      socket.emit("Error", err.message);
    }
  });

  next();
};
