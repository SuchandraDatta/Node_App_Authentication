let express=require('express')
let session=require('express-session')
let File_Store=require('session-file-store')(session)
let bodyParser=require('body-parser')
let passport=require('./Set_up_Passport.js')
let fs=require('fs')
const { authenticate } = require('passport')
let app=express()
let authenticate_jwt=require('./Set_Up_Passport_JWT')
let User_Obj=require('./Set_Up_Database_Stuffs.js')
let bcrypt=require('bcrypt-nodejs')


objForUrlencoded=bodyParser.urlencoded({extended: false})
app.use('/assets', express.static('assets'))
app.use(objForUrlencoded)//If you use POST, then must have this set-up else the damned passport-local doesn't work and no error messages are shown either, only the redirect URL keeps firing.....POST+body-parser are imperative!!!
app.set('view engine', 'ejs')
app.use(session({
    store: new File_Store,
    secret: 'hello world',
    resave: true,
    saveUninitialized: true
}))
app.use(passport.initialize())
app.use(passport.session())
/*app.get('/auth', passport.authenticate('local'), (req,res)=>{
    res.render('articles')
})*/
app.post('/auth', passport.authenticate('local', {successRedirect: 'articles', failureRedirect: '/failurepage'}))

app.get('/', (req,res)=>{
    res.render('index')
})
app.get('/login', (req,res)=>{
    res.render('loginForm', {message: ""})
})
app.get('/articles', (req,res)=>{
    console.log("req.user is: ", req.user)
    if(!req.user)
    {
        res.render('loginForm', {message: ""})
    }
    else
    res.render('articles')
})
app.get('/signup', (req,res)=>{
    res.render('signup')
})
app.post('/donesignup', objForUrlencoded, async (req,res)=>{
    console.log(req.body)
    try
    {
        let row1=await User_Obj.findOne({username: req.body.username})
        console.log(row1)
        if(row1!=null)
        {
            console.log("That username already exists")
            res.render('signup')
        }
        else
        {
            console.log(bcrypt.hashSync(req.body.password[0], bcrypt.genSaltSync(8), null))
            let save_this=User_Obj({username: req.body.username, password: bcrypt.hashSync(req.body.password[0], bcrypt.genSaltSync(8), null)})
            console.log(save_this)
            save_this.save()
            console.log("SAVED IT")
        }
    }
    catch(err){}

})
/*app.get('/auth', passport.authenticate('local'), {successRedirect: '/welcome', failureRedirect: '/login', failureFlash: 'Incorrect username or passowrd'}, (req,res)=>{
    console.log("Over here")
    let token=authenticate_jwt.getToken({_id: req.user._id})
    console.log(token)
    req.headers["x-access-token"]=token
    console.log("The req,header is ", req)
    console.log("Logged in HAHA!")
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.json({success: true, token: token, status: 'You are successfully logged in!'});
})
app.get('/afterauth', authenticate_jwt.verifyUser, (req,res)=>{
    console.log("Verified user using JWT")
})*/
app.listen(3000)