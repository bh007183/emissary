const router = require("express").Router()
const db = require("../models")
const nano = require("nanoid")
const {login, RestVerifyToken} = require("../authentication")
router.post("/api/createUser", async (req, res)=> {
    try{
        await db.User.create(req.body)
        res.status(200).send("Account Created!")
    }catch(err){
        res.status(400).send(err.message)
    }

})
router.post("/api/login", async (req, res)=> {
    try{
        let data = await login(req.body)
        console.log(data)
        res.status(200).json(data)
    }catch(err){
        console.log(err)
        res.status(404).send(err.message)   
    }

})

router.put("/api/addFriend", async (req, res)=> {
    const userId = await RestVerifyToken(token);
    const socketId = nano.nanoid()
    try{
        await db.UserToUser.create({
            socketId: socketId,
            UserId: userId,
            FriendId: req.body.friendId,
          })
    }catch(err){
        console.log(err)
        res.status(404).send(err.message)
    }

})

module.exports = router