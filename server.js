const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')
const mongoose = require('mongoose');
const app = express();


const port = 3000;
const db = 'mongodb+srv://mauk14:0qPTqT3sErKJD2Xe@cluster0.odtn9.mongodb.net/database(main)?retryWrites=true&w=majority';

mongoose
    .connect(db)
    .then(res => console.log('Connected to DB'))
    .catch(error => console.log(error));


const urlencodedParser = bodyParser.urlencoded({ extended: false });

const {OAuth2Client, auth} = require('google-auth-library');
const CLIENT_ID = "604574523814-40f76epsh7ji778mnp5c57ct9jm41dqv.apps.googleusercontent.com";
const client = new OAuth2Client(CLIENT_ID);


async function register(req, res) {
    try{
        
        let token = req.body.token;
        
        console.log(token);

        async function verify() {
            const ticket = await client.verifyIdToken({
                idToken: token,
                audience: CLIENT_ID,
            })
            const payload = ticket.getPayload();
            const userid = payload['sub'];
            console.log(payload);
            return payload;
        }




        const email =   req.body.email;
        const username = req.body.token != null ? verify().username :  req.body.username;
        const password = req.body.token != null ? verify().username :  req.body.password;
    }
    catch(e) {
        console.log(e);
    }
}        


app.set('view engine', 'ejs')
app.use('/public', express.static('public'))
app.use(express.json());
app.use(cookieParser());

app.get('/', (req, res) => {
    res.render('catalog')
})

app.get('/reg', (req, res) => {
    res.render('reg')
})

app.get('/info', (req, res) => {
    res.render('productinfo')
})

app.post('/reg', urlencodedParser, (req, res) => {
    let token = req.body.token;
    
    console.log(token);
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server started")
})