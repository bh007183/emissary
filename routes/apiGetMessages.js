const db = require("../models")
const {RestVerifyToken} = require("../authentication")
const router = require("express").Router()

router.get("/api/getMessages/:roomId", async function (req, res){

    try{
        let userId = await RestVerifyToken(req)

           
        let user = await db.RoomToUser.findOne({
            where: {
                RoomId: req.params.roomId,
                UserId: userId
            }
        })
       if(user){
           let stuff = await db.Room.findOne({
               where:{id: req.params.roomId},
               include: [{model: db.Message}]
           })
           res.status(200).json(stuff)
           

           
       }else{
           console.log("no accesss")
       }

        




    }catch(err){
        console.log(err.message)
        res.status(400).send(err.message)
    }


})
module.exports = router