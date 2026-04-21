const client = require("../config/redis")


const ratelimiter = async (req,res,next) =>{

    try{
    const ip = req.ip
    const count = await client.incr(ip)

    if(count == 1)
    await client.expire("3600")

    if(count>10)
        throw new Error("request limit exceeded")
    
    }


    catch(err){
        res.send(err.message)
    }
}


module.exports = ratelimiter