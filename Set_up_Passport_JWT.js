let passport=require('passport')
let Jwt_Strategy=require('passport-jwt').Strategy
let Jwt_Extract=require('passport-jwt').ExtractJwt
let jwt=require('jsonwebtoken')
let User_Obj=require('./Set_Up_Database_Stuffs')

exports.getToken=(user)=>{
    return jwt.sign(user, 'secretkey', {expiresIn: 3600})
}
let options={}
options.jwtFromRequest=Jwt_Extract.fromAuthHeaderAsBearerToken() //The Bearer token has to be somehow attached to request object from the client side itself or use Postman for testing it out
options.secretOrKey='secretkey'
console.log("These are the options: ", options)
exports.jwtPassport=passport.use(new Jwt_Strategy(options, async (jwt_payload, done)=>{
console.log(jwt_payload)
console.log("Inside the jwtPassport function")
try{ let row1=User_Obj.findOne({_id: jwt_payload._id})
     if(row1==null){return done(null, false)}
     else return done(null,row1)
}
catch(err){console.log("Error", err)}

}))

exports.verifyUser=passport.authenticate('jwt', {session: false})
