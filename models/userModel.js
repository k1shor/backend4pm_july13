const mongoose = require('mongoose')
const crypto = require('crypto')
const uuidv1 = require('uuidv1')

const userSchema = mongoose.Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String, 
        required: true
    },
    hashed_password:{
        type: String,
        required: true
    },
    isVerified:{
        type: Boolean,
        default: false
    },
    role:{
        type: Number, // 0-Normal user, 1 - admin user, 2- superadmin
        default: 0
    },
    salt: String
},{timestamps: true})

// virtual field
userSchema.virtual('password')
.set(function(password){
    this._password = password
    this.salt = uuidv1()
    this.hashed_password = this.encryptPassword(this._password)
})
.get(function(){
    return this._password
})

userSchema.methods = {
    encryptPassword:function(password){
        if(password == null){
            return ''
        }
        try{
            return (this.hashed_password= crypto.createHmac('sha256',this.salt).update(password).digest('hex'))
        }
        catch{
            return ''
        }
    },
    authenticate: function(password){
        return this.hashed_password === this.encryptPassword(password)
    }
}

module.exports = mongoose.model("User", userSchema)

