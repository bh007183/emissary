const express = require("express")
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
io.on("disconnect", (reason) => {
    console.log(reason)
  });

// app.post("/test/login", async (req, res)=> {
//     try{
//         const test = await login(req.body)
//         res.status(200).json(test)
//     }catch(err){
//         res.status(400).send(err.message)
//     }
// })
// app.get("/token", async (req, res)=> {
//     try{
//         const userId = await verifyToken(req)
//         res.status(200).json(test)
//     }catch(err){
//         res.status(400).send(err.message)
//     }
// })
app.use(require("./routes/apiUserRoutes"))
// app.use(require("./routes/initialSocketConnection"))

db.sequelize.sync({force: false}).then(function(){
    httpServer.listen(PORT, function(){
        console.log("app listening on http://localhost:8080")
    })
})

