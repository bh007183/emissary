const router = require("express").Router()
const db = require("../models")
const nano = require("nanoid")
const {login, RestVerifyToken} = require("../authentication")
const { Op } = require("sequelize");
router.post("/api/createUser", async (req, res)=> {
    try{
        await db.User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password,
            socketId: nano.nanoid()

        })
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

router.get("/api/findConnection/:name", async (req, res)=> {
    let inspect = req.params.name.split(" ").filter(item => item !== "")
    let firstName = inspect[0]
    let lastName = inspect[1]
    
    if(lastName){
        try{
            const userId = await RestVerifyToken(req);
            const data = await db.User.findAll({
                where: {
                    firstName: {
                        [Op.substring]: firstName
                    },
                    lastName: {
                        [Op.substring]: lastName
                    }
                },
                attributes: {
                    exclude: [
                      "password",
                      "UserToUser",
                      "createdAt",
                      "updatedAt"
                    ]
                  }
            })
            if(data.length){
                console.log(data)
                res.status(200).json(data)
            }else{
                console.log(data)
                res.status(200).json(["No Matching Results."])
            }
        }catch(err){
            console.log(err)
            res.status(404).send(err.message)
        }

    }else{
        try{
            const userId = await RestVerifyToken(req);
            console.log(userId)
            const data = await db.User.findAll({
                where: {
                    firstName: {
                        [Op.substring]: firstName
                    }
                },
                attributes: {
                    exclude: [
                      "password",
                      "UserToUser",
                      "createdAt",
                      "updatedAt"
                    ]
                  }
            })
            if(data.length){
                console.log(data)
                res.status(200).json(data)
            }else{
                console.log(data)
                res.status(200).json(["No Matching Results."])
            }
        }catch(err){
            console.log(err)
            res.status(404).send(err.message)
        }


    }
    

})

module.exports = router