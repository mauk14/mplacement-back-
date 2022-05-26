const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser')
const authRouter = require('./authRouter')
const mongoose = require('mongoose');
const app = express();
const authGoogle = require('./authGoogle')
const passport = require('passport');
const config = require('./config');
const auth = require('./auth');

const port = process.env.PORT || 3000;
const db = 'mongodb+srv://admin-Zhandos:Qwerty12345@cluster0.kcsik.mongodb.net/?retryWrites=true&w=majority';


app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter)
app.use(session({secret:"cats"}));
app.use(passport.initialize());
app.use(passport.session());

mongoose
    .connect(db)
    .then(res => console.log('Connected to DB'))
    .catch(error => console.log(error));


  

app.get('/', (req, res) => {
    res.render('catalog', {auth:res.user})
})

app.get('/auth/google', 
    passport.authenticate('google', {scope: ['email', 'profile']})
)

app.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/auth/db',
        failureRedirect: '/error'
    })
)

app.get('/error', (req, res) => {
    res.send('something went wrong');
})
app.get('/info',(req, res) => {
    res.render('productinfo', {auth:res.user})
})

app.get('/mes', (req, res) => {
    res.send(`Hello ${req.user.email}`)
})
    

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server started")
})