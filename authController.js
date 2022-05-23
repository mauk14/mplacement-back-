const User = require('./schemes/User');
const Role = require('./schemes/Role');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {validationResult} = require('express-validator')
const {secret} = require("./config");
const { json } = require('express/lib/response');

const generateAccessToken = (id, roles) => {
    const payload = {
        id,
        roles
    }
    return jwt.sign(payload, secret, {expiresIn: "24"})
}

class authController {

    async registration(req, res) {
        try {
            const errors = validationResult(req);
            if(!errors.isEmpty()) {
                return res.status(400).json({message: errors})
            }
            const username = await req.body.username;
            const email = await req.body.email;
            const password = await req.body.password;
            const candidate = await User.findOne({email})
            if(candidate) {
                return res.status(400).json({message: "Email have alredy used"})
            }
            console.log(username)
            console.log(password)
            const salt = await bcrypt.genSaltSync(10);
            const hashPassword = await bcrypt.hashSync(password, salt);
            const userRole = await Role.findOne({value: "USER"})
            const user = new User({username, email, password: hashPassword, roles: [userRole.value]})
            await user.save();
            return res.redirect("/")
        } catch(e) {
            console.log(e);
            res.status(400).json({message: "error"})

        }   
    }

    async login(req, res) {
        try {
            const email = await req.body.email;
            const password = await req.body.password;
            console.log(email)
            console.log(password)
            const user = await User.findOne({email})
            if(!user) {
                return res.status(400).json({message: "User not found"});
            }
            const validPassword = bcrypt.compareSync(password, user.password);
            if(!validPassword) {
                return res.status(400).json({message: "Password isn't correct"});
            }

            const token = generateAccessToken(user._id, user.roles);
            return res.redirect("/")

        } catch(e) {
            console.log(e);
            res.status(400).json({message: "error"})

        }
    }

    async getUsers(req, res) {
        try {
            const users = await User.find()
            res.json(users)

        } catch(e) {
            console.log(e);
        }
    }
}

module.exports = new authController();