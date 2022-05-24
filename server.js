const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser')
const authRouter = require('./authRouter')
const mongoose = require('mongoose');
const app = express();
const authGoogle = require('./authGoogle')
const passport = require('passport');
const User = require('./schemes/User');
const Role = require('./schemes/Role');

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
    res.render('catalog')
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

app.get('/auth/db', async (req, res) => {
    try {
        const email = await req.user.email;
        const username = await req.user.displayName;
        console.log(email)
        console.log(username)
        const user = await User.findOne({email})
        if(!user) {
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, email, password: "awdsadwadsada",roles: [userRole.value]})
            await user.save();
        }
        return res.redirect("/")

    } catch(e) {
        console.log(e);
        res.status(400).json({message: "error"})

    }
})
app.get('/error', (req, res) => {
    res.send('something went wrong');
})
app.get('/info', (req, res) => {
    res.render('productinfo')
})

app.get('/mes', (req, res) => {
    res.send(`Hello ${req.user.email}`)
})
    

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server started")
})