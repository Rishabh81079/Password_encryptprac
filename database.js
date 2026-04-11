const mongoose = require('mongoose')

async function main(){
    await mongoose.connect("mongodb+srv://rishabh:dbuser@cluster0.imjmxqr.mongodb.net/DB")

}

module.exports = main
