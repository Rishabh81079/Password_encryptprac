const express = require('express')
const collection = require('../Models/users')
const jwt = require('jsonwebtoken')
const redisClient = require('../config/redis')
const middlewareAuth = require('../Middleware/auth')
require('dotenv').config()


const router = express.Router()


router.post('/login', async (req, res) => {
    try {
        const ans = await collection.findOne({ email: req.body.email })
        if (!ans) throw new Error("User not found")

        const isAllowed = await ans.verifypassword(req.body.password)
        if (!isAllowed) throw new Error("Wrong password")

        const token = jwt.sign({ _id: ans._id },process.env.Secret,{ expiresIn: "100s" }
        )

        res.cookie("token", token, { httpOnly: true})
        res.send("Successfully login")

    } catch (err) {
        res.status(401).send(err.message)
    } 
})


router.post('/logout', middlewareAuth, async (req, res) => {
    try {
       
     const {token} = req.cookies
        const time = jwt.decode(token)
        if (!time) throw new Error("Invalid token")
        console.log(time.exp);

        await redisClient.set(`token:${token}`, "blocked")
        await redisClient.expireAt(`token:${token}`, time.exp)
        res.clearCookie("token")
        res.send("logout successfully")

    } catch (err) {
        res.status(400).send(err.message)
    }
})


module.exports = router