const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser')

const app = express();
const port = 3000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });


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