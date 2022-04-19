const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

const urlencodedParser = bodyParser.urlencoded({ extended: false });


app.set('view engine', 'ejs')
app.use('/public', express.static('public'))

app.get('/', (req, res) => {
    res.render('catalog')
})

app.get('/reg', (req, res) => {
    res.render('reg')
})

app.post('/reg', urlencodedParser, (req, res) => {
    if (!req.body) return res.sendStatus(400);
    console.log(req.body);
    res.render('catalog', {data : req.body});
})

app.listen(port, (err) => {
    err ? console.log(err) : console.log("server started")
})