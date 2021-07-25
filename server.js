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

app.use("/adduser", async (req, res)=> {
    console.log(req.body)
    try{
        await db.User.create(req.body)
        res.status(200).send("yay")
    }catch(err){
        console.log(err)
        res.status(404).send(err.message)
    }
   
    

})

app.use("/test/login", async (req, res)=> {
    console.log(req.body)
    const test = await login(req.body)
    console.log(test)
    await db.User.create(req.body)
    res.status(200).send("yay")

})


db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function(){
        console.log("app listening on http://localhost:8080")
    })
})

