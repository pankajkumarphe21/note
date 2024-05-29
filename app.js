const express = require('express');
const path = require('path');
const app = express();
const userModel=require('./models/user');
const passport=require('passport');
const expressSession=require('express-session');
const localStrategy=require('passport-local').Strategy;

passport.use(new localStrategy(userModel.authenticate()))

app.use(express.static(path.join(__dirname, 'public'))); 
app.use(expressSession({
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET || 'hey hey'
}))
app.set('view engine','ejs');
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(passport.session())

app.get('/', (req, res) => {
    res.render('index')
});

app.post('/signup',async (req,res)=>{
    const {username,fullname,password}=req.body
    const user=await userModel.find({username})
    if(user.length===0){
        const user=await userModel.create({username,fullname,password});

        res.redirect('/login');
    }
    else{
        res.send('<h1>Something went wrong</h1>')
    }
})

app.get('/profile',isLoggedIn,async (req,res)=>{
    const user=await userModel.findOne({username:req.session.passport.user});
    res.sendFile()
})

function isLoggedIn(req,res,next){
    if(req.isAuthenticated()){
        next()
    }
    else{
        res.redirect('/')
    }
}

app.post('/login',async (req,res)=>{
    const user=await userModel
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
