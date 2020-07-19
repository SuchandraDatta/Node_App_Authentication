let mongoose=require('mongoose')
let bcrypt=require('bcrypt-nodejs')
const passport = require('passport')
let schema=mongoose.Schema

let user_schema=new schema({
    username: String,
    password:String
})

user_schema.methods.gen_hash=(password)=>{
    return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null)
}
user_schema.methods.check_valid_password=(password)=>{
    return bcrypt.compareSync(password, this.password)
}
mongoose.connect('mongodb+srv://Username and password stuff goes here/AnimalRescueApp?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true})
let User_Obj=mongoose.model('CollectionOne', user_schema)

module.exports=User_Obj