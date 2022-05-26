const Router = require('express');
const router = new Router();
const controller = require('./authController')
const {check} = require('express-validator')
const auth = require("./auth")
const authGoogle = require('./authGoogle')
const bodyParser = require('body-parser')
const passport = require('passport');
const roleMiddleware = require('./middleware/roleMiddleware') 
const urlencodedParser = bodyParser.urlencoded({extended: false})

router.use(session({secret:"cats"}));




router.get('/auth/google', 
    passport.authenticate('google', {scope: ['email', 'profile']})
)

router.get('/google/callback', 
    passport.authenticate('google', {
        successRedirect: '/auth/db',
        failureRedirect: '/error'
    })
)

router.get('/error', (req, res) => {
    res.send('something went wrong');
})
router.get('/info', auth(), (req, res) => {
    res.render('productinfo')
})

router.get('/mes', (req, res) => {
    res.send(`Hello ${req.user.email}`)
})

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