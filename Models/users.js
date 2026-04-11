const mongoose = require("mongoose")

const {Schema} = mongoose 

const schema = new Schema({
    name:{
        type:String,
        required: true,
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
    }
})

const collection = mongoose.model('user',schema)


module.exports = collection
