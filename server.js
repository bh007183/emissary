const express = require("express")
const app = express()
const db = require("./models")
const cors = require("cors")
require("dotenv").config()
const {login, verifyToken} = require("./authentication")




const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))

// app.post("/adduser", async (req, res)=> {
//     console.log(req.body)
//     try{
//         await db.User.create(req.body)
//         res.status(200).send("yay")
//     }catch(err){
//         console.log(err)
//         res.status(404).send(err.message)
//     }
   
    

// })

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


db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function(){
        console.log("app listening on http://localhost:8080")
    })
})

