const db = require("../models");
const nano = require("nanoid");
const { verifyToken } = require("../authentication");
const { Op } = require("sequelize");

module.exports = function (socket, next) {
  const token = socket.handshake.auth.token;
  socket.on("create", async function (data) {
    try {
      // Verify Proper Authorization //
      const { userId } = await verifyToken(token);
      // Create Room
      let roomCreated = await db.Room.create({
        id: nano.nanoid(),
        // name: name optional
      });
      // Add Participents to Room

      let cloned = [userId, ...data.map((person) => person.id)];
      await roomCreated.addUsers(cloned);

      // Retreaving room with Users and Parsing Data to Usable Response format
      let parsedData = await db.Room.findOne({
        attributes: ["id", "name"],
        where: {
          id: roomCreated.dataValues.id,
        },
        include: [
          {
            model: db.User,
            attributes: ["firstName", "lastName", "id", "socketId"],
            through: {
              attributes: [],
            },
          },
        ],
      }).catch((err) => socket.emit("Error", err.message));

      // Emitting Room Data and User Data to Users.
      await parsedData.dataValues.Users.map((User) =>
        socket.to(User.dataValues.socketId).emit("RoomCreated", parsedData)
      );
      socket.emit("RoomCreated", parsedData);
    } catch (err) {
      socket.emit("Error", err.message);
    }
  });
  next();
};
