const express = require("express");
const app = express();
const db = require("./models");
const path = require("path")
const cors = require("cors");
require("dotenv").config();

// Socket server initialization
const httpServer = require("http").createServer(app);

const io = require("socket.io")(httpServer, {
  cors: {
    origin: "*",
  },
  path: "/socket"
});

var corsOptions = {
  origin: "https://foreign-emissary.herokuapp.com",
};


const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
io.on("connection", (socket) => {
  console.log("connected")
});
io.use(require("./routes/joinSocketRoomAfterLogin"))
io.use(require("./routes/deleteMessageSocket"));
io.use(require("./routes/editMessageSocket"));
io.use(require("./routes/initialSocketConnection"));
io.use(require("./routes/deleteRoomSocket"));
io.use(require("./routes/acceptConnectionSocket"));
io.use(require("./routes/createRoomSocket"));
io.use(require("./routes/socketSendMessages"));
io.use(require("./routes/addConnectionSoccet"));
io.use(require("./routes/disconnectSocket"));

io.on("disconnect", (reason) => {
  console.log(reason);
});

app.use(require("./routes/apiUserRoutes"));
app.use(require("./routes/apiGetMessages"));

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "/client/build/index.html"));
});

db.sequelize.sync({ force: false }).then(function () {
  httpServer.listen(PORT, function () {
    console.log("app listening on http://localhost:8080");
  });
});
