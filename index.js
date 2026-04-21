const express = require('express')
const app = express()
const main = require("./database")
const cookieParser = require('cookie-parser')
const redisClient = require('./config/redis')
const router = require('./utils/loginlogout')
const router2 = require('./utils/crud')
const ratelimiter = require('./Middleware/ratelimiter')


require('dotenv').config()

app.use(express.json())
app.use(cookieParser())

app.use(ratelimiter)
app.use('/admin', router)
app.use('/', router2)



// const pass = "rishabh10"
// async function hashing(){
// const salting = await bcrypt.genSalt(10)
// const ans = await bcrypt.hash(pass,salting)
// const comp = await bcrypt.compare(pass, ans)
// console.log(comp);
// }

// hashing()





const initializeConnect = async ()=>{

    try{
        //await redisClient.connect()
        //await main()
        await Promise.all([redisClient.connect(),main()])
        console.log("connected DB")
    app.listen(1234,()=>{
    console.log("connected Backend")
    })
    }
    catch(err){
        console.log(err.message);
        
    }
}

initializeConnect()
 

// main()
// .then(async ()=>{
//     await redisClient.connect()
//     console.log("connected DB")
//     app.listen(1234,()=>{
//     console.log("connected Backend")
// })
// })
// .catch((err)=>console.log(err))