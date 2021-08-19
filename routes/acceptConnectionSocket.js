const { verifyToken } = require("../authentication");
const db = require("../models");

// Response!!!!!!!!!!

module.exports = async function (socket, next) {
  const token = socket.handshake.auth.token;

  socket.on("acceptedConnection", async function (data) {
    try {
      const { userId, name, socketId } = await verifyToken(token);
      // updating friends to true
      await db.UserToUser.update(
        {
          friendRequestAccepted: true,
        },
        {
          where: {
            UserId: data.id,
            FriendId: userId,
          },
        }
      );

      // send to initiator
      let recipient = await db.User.findOne({
        where: {
          id: userId,
        },
        attributes: {
          exclude: ["password", "UserToUser", "createdAt", "updatedAt"],
        },
      });

      // send to recipient
      let initiator = await db.User.findOne({
        where: {
          id: data.id,
        },
        attributes: {
          exclude: ["password", "UserToUser", "createdAt", "updatedAt"],
        },
      });
      console.log(initiator)
      console.log(recipient)
      //
      socket.emit("UnshiftFriend", initiator);
      socket.to(data.friendSocket).emit("UnshiftFriend", recipient);
      //   send notification to initiator
      socket.to(data.friendSocket).emit("Notification", {
        message: `${name} is now a connection`,
        friendId: toString(userId),
        type: "CONNECTION_ACCEPTED",
      });
      // socket.emit("Notification", {message: `${name} is now a connection`, friendId: toString(userId), type: "CONNECTION_ACCEPTED"})
    } catch (err) {
      socket.emit("Error", err.message);
    }
  });

  next();
};
