const redisClient = require('../config/redis')
const jwt = require('jsonwebtoken');

require('dotenv').config()

const middlewareAuth = async (req,res,next)=>{
    try{
     const {token} = req.cookies
            if (!token) throw new Error("No token")
    
            await jwt.verify(token, process.env.Secret)
    
            const isBlocked = await redisClient.exists(`token:${token}`)
            if (isBlocked) throw new Error("Token invalid")

    next()

            }
    catch(err){
        res.send(err.message)
    }    
}
module.exports = middlewareAuth