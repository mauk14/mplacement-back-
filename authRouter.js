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
const getUserList = require('./user').getUserList;
const findUserById = require('./user').findUserById;

router.use(bodyParser.json())
const userList = getUserList();

const swaggerUi = require('swagger-ui-express'),
swaggerDocument = require('./swagger.json');

router.use(session({secret:"cats"}));
router.use(passport.initialize());
router.use(passport.session());
router.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

router
    .get('/login', (req, res) => {
        res.render('login', {auth:res.user})
    })
    .post('/login', urlencodedParser, controller.login)

router
    .get('/reg', (req, res) => {
        res.render('reg', {auth:res.user})
    })
    .post('/reg', urlencodedParser, controller.registration)    


router.get('/auth/db', controller.gLogin);

router.get('/users',  roleMiddleware(["ADMIN"]), controller.getUsers);    

router.get("/users", (req, res) => {
    return res.status(200).send({
        success: "true",
        message: "users",
        users: userList,
    });
});
router.post("/addUser", (req, res) => {

    if (!req.body.name) {
        return res.status(400).send({
            success: "false",
            message: "name is required",
        });
    } else if (!req.body.companies) {
        return res.status(400).send({
            success: "false",
            message: "companies is required",
        });
    }
    const user = {
        id: userList.length + 1,
        isPublic: req.body.isPublic,
        name:  req.body.name,
        companies: req.body.companies,
        books:  req.body.books
    };
    userList.push(user);
    return res.status(201).send({
        success: "true",
        message: "user added successfully",
        user,
    });
});
router.put("/user/:userId", (req, res) => {
    console.log(req.params)
    const id = parseInt(req.params.userId, 10);
    const userFound=findUserById(id)


    if (!userFound) {
        return res.status(404).send({
            success: 'false',
            message: 'user not found',
        });
    }

    const updatedUser= {
        id: id,
        isPublic: req.body.isPublic || userFound.body.isPublic,
        name:req.body.name || userFound.body.name,
        companies: req.body.companies || userFound.body.companies,
        books: req.body.books || userFound.body.books

    };

    if (!updatedUser.name) {
        return res.status(400).send({
            success: "false",
            message: "name is required",
        });
    } else if (!updatedUser.companies) {
        return res.status(400).send({
            success: "false",
            message: "companies is required",
        });
    }

    for (let i = 0; i < userList.length; i++) {
        if (userList[i].id === id) {
            userList[i] = updatedUser;
            return res.status(201).send({
                success: 'true',
                message: 'user updated successfully',
                updatedUser

            });
        }
    }
    return  res.status(404).send({
        success: 'true',
        message: 'error in update'

    });
})
router.delete("/user/:userId", (req, res) => {
    console.log(req.params)
    const id = parseInt(req.params.userId, 10);
    console.log(id)
    for(let i = 0; i < userList.length; i++){
        if(userList[i].id === id){
            userList.splice(i,1);
            return res.status(201).send({
                success: 'true',
                message: 'user deleted successfully'
            });
        }
    }
    return res.status(404).send({
        success: 'true',
        message: 'error in delete'
    });
})


module.exports = router;