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
router.use(passport.initialize());
router.use(passport.session());


router
    .get('/login',  (req, res) => {
        res.render('login')
    })
    .post('/login',  urlencodedParser, controller.login)

router
    .get('/reg', auth(), (req, res) => {
        res.render('reg')
    })
    .post('/reg', urlencodedParser, controller.registration)    


router.get('/auth/db',  controller.gLogin);

router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers);    

module.exports = router;