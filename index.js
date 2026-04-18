const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

const main = require("./database")
const collection = require("./Models/users")
const validateuser = require('./utils/validateuser')

const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken');
const redisClient = require('./config/redis')
const middlewareAuth = require('./Middleware/auth')


const router = require('./utils/loginlogout')


require('dotenv').config()

app.use(express.json())
app.use(cookieParser())

app.use('/admin', router)

app.get('/info', middlewareAuth, async (req, res) => {
    try {
       

        const ans = await collection.find()
        res.send(ans)

    } catch (err) {
        res.status(401).send(err.message)
    }
})


app.post('/info', middlewareAuth, async (req,res)=>{

    try{
   
        validateuser(req.body)
        req.body.password = await bcrypt.hash(req.body.password,10)
    await collection.create(req.body)
    res.send("created")
    }
    catch(err){
        res.send(err.message)
    }
})


app.delete('/info', middlewareAuth, async (req,res)=>{
    await collection.deleteOne({name:"r"})
    res.send("deleted")
})


app.put('/info', middlewareAuth, async (req,res)=>{
    await collection.updateOne({name:"r"},{age:50})
    res.send("updated")
})


app.get('/info/:id', middlewareAuth, async (req,res)=>{
    try{
        const ans = await collection.findById(req.params.id)
        res.send(ans)
    }
    catch(err){
        res.send(err.message)
    }
    
})


app.patch('/info', middlewareAuth, async (req,res)=>{

    const {_id, ...update} = req.body
    await collection.findByIdAndUpdate(_id, update)
    res.send("updated")
})


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