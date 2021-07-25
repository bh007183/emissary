const express = require("express")
const app = express()
const db = require("./models")
const cors = require("cors")
require("dotenv").config()




const PORT = process.env.PORT || 8080
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: true}))




db.sequelize.sync({force: false}).then(function(){
    app.listen(PORT, function(){
        console.log("app listening on http://localhost:8080")
    })
})

