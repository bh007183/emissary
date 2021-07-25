const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
const db = require("./models")

module.exports = {

    login: async function({email, password}){
        let findEmail;
        try{
            findEmail = await db.User.findOne({
                where:{
                    email: email
                }
            })
        }catch(err){
            throw new Error(`${err.message}`)
        }
        if(findEmail){
            try{
                const match = await bcrypt.compare(password, findEmail.password)
                if(match){
                    try{
                        return await jwt.sign({email: findEmail.email, id: findEmail.id}, process.env.JSON_RIO, {expiresIn: '1h'})

                    }catch(err){
                        console.log(err)
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

    verifyToken: function(req){
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
            try{
                let valid = await jwt.verify(token, process.env.JSON_RIO)
                console.log(valid)
                return valid.id

            }catch(err){
                throw new Error(err.message)
            }
            
        }

        

    }
}