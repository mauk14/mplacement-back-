const express = require('express');
const session = require("express-session");
const cookieParser = require('cookie-parser')
const authRouter = require('./authRouter')
const mongoose = require('mongoose');
const app = express();
const passport = require('passport');
const config = require('./config')
const auth = require("./auth")

const port = process.env.PORT || 3000;
const db = 'mongodb+srv://admin-Zhandos:Qwerty12345@cluster0.kcsik.mongodb.net/?retryWrites=true&w=majority';


app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.json());
app.use(cookieParser());
app.use("/", authRouter)
mongoose
    .connect(db)
    .then(res => console.log('Connected to DB'))
    .catch(error => console.log(error));



router.get('/', auth(), (req, res) => {
    res.render('catalog')
})    

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server started")
})