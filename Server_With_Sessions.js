let express=require('express')
let session=require('express-session')
let File_Store=require('session-file-store')(session)

let app=express()
app.use(session({
  store: new File_Store,
  secret: 'hello world',
  resave: true,
  saveUninitialized: true
}))
app.use('/', (req,res,next)=>{
  if(!req.session.user)
  {
    console.log("Session not set-up yet")
    if(!req.headers.authorization)
    {
      console.log("No auth headers")
      res.setHeader("WWW-Authenticate", "Basic")
      res.sendStatus(401)
    }
    else
    {
      auth_stuff=new Buffer.from(req.headers.authorization.split(" ")[1], 'base64')
      step1=auth_stuff.toString().split(":")
      console.log("Step1: ", step1)
      if(step1[0]=='admin' && step1[1]=='admin')
      {
        console.log('GENUINE USER')
        req.session.user='admin'
        res.send("GENUINE USER")
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
    if(req.session.user=='admin')
    {
      console.log("GENUINE VAI SESSIONS")
      console.log(req.session)
      res.send("GENUINE VIA SESSIONS")

    }
    else
    {
      res.setHeader("WWW-Authenticate", "Basic")
      res.sendStatus(401)
    }
  }
})





app.listen(3000)