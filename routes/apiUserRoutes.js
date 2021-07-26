const router = require("express").Router()
const db = require("../models")

router.post("/api/createUser", async (req, res)=> {
    try{
        await db.User.create(req.body)
        res.status(200).send("Account Created!")
    }catch(err){
        res.status(400).send(err.message)
    }

})

module.exports = router