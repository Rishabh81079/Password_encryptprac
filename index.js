const express = require('express')
const bcrypt = require('bcrypt')
const app = express()

const main = require("./database")
const collection = require("./Models/users")

app.use(express.json())


app.get('/info',async (req,res)=>{
    const ans = await collection.find()
    res.send(ans)
})


app.post('/info', async (req,res)=>{

    try{
   
        
    await collection.create(req.body)
    res.send("created")
    }
    catch(err){
        res.send(err.message)
    }
})


app.delete('/info',async (req,res)=>{
    await collection.deleteOne({name:"r"})
    res.send("deleted")
})


app.put('/info',async (req,res)=>{
    await collection.updateOne({name:"r"},{age:50})
    res.send("updated")
})


app.get('/info/:id',async (req,res)=>{
    try{
        const ans = await collection.findById(req.params.id)
        res.send(ans)
    }
    catch(err){
        res.send(err.message)
    }
    
})


app.patch('/info',async (req,res)=>{

    const {_id, ...update} = req.body
    await collection.findByIdAndUpdate(_id, update)
    res.send("updated")
})


const pass = "rishabh10"

async function hashing(){
const salting = await bcrypt.genSalt(10)
const ans = await bcrypt.hash(pass,salting)
const comp = await bcrypt.compare(pass, ans)
console.log(comp);
}

hashing()

main()
.then(async ()=>{
    console.log("connected DB")
    app.listen(1234,()=>{
    console.log("connected Backend")
})
})
.catch((err)=>console.log(err))
