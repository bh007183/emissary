const express = require("express")
const nano = require("nanoid")
const app = express()
const db = require("./models")
const cors = require("cors")
require("dotenv").config()
// const {login, verifyToken} = require("./authentication")
// Socket server initialization
const httpServer = require("http").createServer(app);


const io = require("socket.io")(httpServer, {
    cors: {
        origin: "*",
      },
})

const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))


   
io.use(require("./routes/initialSocketConnection"))
io.use(require("./routes/createRoomSocket"))

io.on("disconnect", (reason) => {
    console.log(reason)
  });





app.use(require("./routes/apiUserRoutes"))


db.sequelize.sync({force: false}).then(function(){
    httpServer.listen(PORT, function(){
        console.log("app listening on http://localhost:8080")
    })
})

