const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const db = require("../models")

module.exports = {

    login: async function({email, password}){
        let findEmail;
        try{
            findEmail = await db.User.findOne({
                where:{
                    email: email
                }
            })
            console.log(findEmail)
        }catch(err){
            throw new Error(`${err.message}`)
        }
        if(findEmail){
            const data = findEmail.dataValues
            try{
                const match = await bcrypt.compare(password, data.password)
                if(match){
                    
                    try{
                        let firstTimeFlag;
                        if(findEmail.firsttime === true){
                            firstTimeFlag = true
                            db.User.update(
                                {firsttime: false},
                                {where:{
                                    email: findEmail.email
                                }}
                            )
                        }
                        let resData = await jwt.sign({email: data.email, userId: data.id, name: `${data.firstName} ${data.lastName}`, socketId: data.socketId}, process.env.JSON_RIO, {expiresIn: '1h'})
                        return {
                            token: resData,
                            user: data.firstName,
                            firstTime: firstTimeFlag
                        }
                    }catch(err){

                        throw new Error(`${err}`)
                    }
                }else{
                    throw new Error("Invalid Login Credentials")
                }
            }catch(err){
                throw new Error(`${err.message}`)
            }
        }else{
            throw new Error("Invalid Login Credentials")
        }
    },

    verifyToken: async function(req){
        let token = req
        if(!token){
            throw new Error('You must login to access account.')
        }else{
            
                let valid = await jwt.verify(token, process.env.JSON_RIO, (err, token)=>{
                    if(err){
                        throw new Error('Session expired. Please log in.')
                    }else{
                        return token
                    }
                })
                return valid
            
            
        }

        

    },
    RestVerifyToken: async function(req){
        let token = false
        if(!req.headers){
            token = false
        }else if(!req.headers.authorization){
            token = false
        }else{
            token = req.headers.authorization.split(" ")[1]
        }
        
        if(!token){
            throw new Error('You must login to access account.')
        }else{
                let valid = await jwt.verify(token, process.env.JSON_RIO, (err, token)=>{
                    if(err){
                        throw new Error('Session expired. Please log in.')
                    }else{
                        return token
                    }
                })
                return valid.userId
            
            
        }

        

    }
}