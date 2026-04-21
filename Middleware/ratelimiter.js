const client = require("../config/redis")


const ratelimiter = async (req,res,next) =>{

    try{
    const ip = req.ip
    const key = `rate:${ip}`
    const current_time = Date.now()

    await client.zRemRangeByScore(key,0, current_time)

    const count = await client.zCard(key)

    if (count >= 5) {
  return res.status(429).send("Too many requests ❌")
}

    await client.zAdd(key ,current_time, current_time )

    await client.expire(key, 60)

    }
    catch(err){
        res.send(err.message)
    }
}


module.exports = ratelimiter