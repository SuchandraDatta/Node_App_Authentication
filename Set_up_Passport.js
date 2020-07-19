let passport=require('passport')
let bcrypt=require('bcrypt-nodejs')
let User_Obj=require('./Set_Up_Database_Stuffs')
const local_strategy=require('passport-local').Strategy

passport.use(new local_strategy(
    async (username, password, done)=>{
        console.log("Here inside local_strategy" ,username, password)
      /*if(username=='admin' && password=='admin')
      {
          console.log("VALID USER")
          done(null, user)
      }
      else done(null, false)
    }*/
    try
    {
        let row1=await User_Obj.findOne({username: username})
        console.log(row1)
        if(row1==null)
        {
            console.log("NO RECORDS FOUND")
            return done(null, false)
        }
        else
        {
            console.log("Record found")
            console.log(row1)
            if(bcrypt.compareSync(password, row1.password))//Compare plaintext password with the hash
            {
                console.log("The passwords match")
                console.log("Finished authenticate local")
                return done(null, row1)
            }
            else
                {
                    console.log("The passwords don't match")
                    return done(null, false)
                }
        }
        
    }
    catch(err){
        console.log("Some error here")
        return done(err)}
    }
  ));
passport.serializeUser((user,done)=>{
    done(null, user.username)
})
passport.deserializeUser((user,done)=>{
    done(null, user)
})
module.exports=passport