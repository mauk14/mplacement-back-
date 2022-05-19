const Router = require('express');
const router = new Router();
const controller = require('./authController')
const {check} = require('express-validator')
const authMiddleware = require('./middleware/authMiddleware')
const roleMiddleware = require('./middleware/roleMiddleware')
const bodyParser = require('body-parser')

const urlencodedParser = bodyParser.urlencoded({extended: false})

router
    .get('/login', (req, res) => {
        res.render('login')
    })
    .post('/login', urlencodedParser, controller.login)

router
    .get('/reg', (req, res) => {
        res.render('reg')
    })
    .post('/reg', urlencodedParser, controller.registration)    


router.get('/users', roleMiddleware(["ADMIN"]), controller.getUsers);    

module.exports = router;