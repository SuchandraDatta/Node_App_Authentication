let express=require('express')
let cookie_parser=require('cookie-parser')

let app=express()
app.use(cookie_parser('1234'))
app.use('/', (req,res,next)=>{
    let cookie_Stuff=req.signedCookies.user
    //If does not exits then auth_Stuff will be undefined
    console.log("COOKIE: ", cookie_Stuff)
    if(!cookie_Stuff)
    {
        let auth_Stuff=req.headers.authorization
        console.log("Basic_Auth: ", auth_Stuff)
        if(!auth_Stuff)
        {
            res.setHeader("WWW-Authenticate", "Basic")
            res.sendStatus(401)
        }
        else
        {
            step1=new Buffer.from(auth_Stuff.split(" ")[1], 'base64')
            step2=step1.toString().split(":")
            console.log("Step1: ", step1.toString().split(":"))
            console.log("Step2: ", step2)

            if(step2[0]=='admin' && step2[1]=='admin')
            {
                console.log("WELCOME ADMIN")
                res.cookie('user', 'admin', {signed: true})
                res.send("Signed in the first time")
            }
            else
            {
                res.setHeader("WWW-Authenticate", "Basic")
                res.sendStatus(401)
            }
        }
    }
    else
    {
        if(req.signedCookies.user=='admin')
        {
            res.send("HELLO GENUINE USER")
        }
        else
        {
            res.setHeader("WWW-Authenticate", "Basic")
            res.sendStatus(401)
        }
    }
})
app.get('/', (req,res,next)=>{
  res.send("BASIC AUTHENTICATION DONE EH??")
})
app.listen(3000)