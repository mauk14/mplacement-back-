const Router = require('express');
const router = new Router();
const controller = require('./authController')
const {check} = require('express-validator')
const auth = require("./auth")
const authGoogle = require('./authGoogle')
const bodyParser = require('body-parser')
const passport = require('passport');
const roleMiddleware = require("./middleware/roleMiddleware") 
const urlencodedParser = bodyParser.urlencoded({extended: false})
const session = require("express-session");

router.use(session({secret:"cats"}));
app.use(passport.initialize());
app.use(passport.session());


router
    .get('/login', auth(), (req, res) => {
        res.render('login')
    })
    .post('/login', auth(), urlencodedParser, controller.login)

router
    .get('/reg', auth(), (req, res) => {
        res.render('reg')
    })
    .post('/reg', auth(), urlencodedParser, controller.registration)    


router.get('/auth/db', auth(), controller.gLogin);

router.get('/users', auth(), roleMiddleware(["ADMIN"]), controller.getUsers);    

module.exports = router;