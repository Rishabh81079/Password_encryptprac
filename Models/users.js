const mongoose = require("mongoose")
const bcrypt = require('bcrypt')
const {Schema} = mongoose 

const schema = new Schema({
    name:{
        type:String,
        minLength: 2,
        maxLength:20 
    },
    age:{
        type:Number,
        min: 17,
        max:70
    },
    city:{
        type:String,
        enum:["jaipur","delhi","alwar"],
        lowercase:true
    },
    email:{
        type:String,
        unique:true,
        // required:true
    },
    password:{
        type:String,
        
    }
},{timestamps:true})


schema.methods.verifypassword = async function(pass){

    const result = await bcrypt.compare(pass, this.password)
    return result
}

const collection = mongoose.model('user',schema)


module.exports = collection
