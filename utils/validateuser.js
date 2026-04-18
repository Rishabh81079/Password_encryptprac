const validate = require('validator')


function validateuser(data){
    
    if(!validate.isEmail(data.email))
        throw new Error ("email is not valid")

    if(!validate.isStrongPassword(data.password))
        throw new Error("week password")

    if(!(data.name.length>=2 && data.name.length<=20))
        throw new Error("Increase length of name")


    const mandatoryfields = ["email","password"]
    const isAllowed = mandatoryfields.every((k)=>Object.keys(data).includes(k))
    if(!isAllowed)
        throw new Error("field is missing")
}


module.exports = validateuser