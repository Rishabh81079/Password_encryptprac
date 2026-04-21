const express = require('express')
const middlewareAuth = require('../Middleware/auth')
const collection = require("../Models/users")
const validateuser = require('../utils/validateuser')
const bcrypt = require('bcrypt')

const router2 = express.Router()



router2.get('/info', middlewareAuth, async (req, res) => {
    try {
       

        const ans = await collection.find()
        res.send(ans)

    } catch (err) {
        res.status(401).send(err.message)
    }
})


router2.post('/info', middlewareAuth, async (req,res)=>{

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


router2.delete('/info', middlewareAuth, async (req,res)=>{
    await collection.deleteOne({name:"r"})
    res.send("deleted")
})


router2.put('/info', middlewareAuth, async (req,res)=>{
    await collection.updateOne({name:"r"},{age:50})
    res.send("updated")
})


router2.get('/info/:id', middlewareAuth, async (req,res)=>{
    try{
        const ans = await collection.findById(req.params.id)
        res.send(ans)
    }
    catch(err){
        res.send(err.message)
    }
    
})


router2.patch('/info', middlewareAuth, async (req,res)=>{

    const {_id, ...update} = req.body
    await collection.findByIdAndUpdate(_id, update)
    res.send("updated")
})


module.exports = router2