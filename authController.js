const User = require('./schemes/User');
const Role = require('./schemes/Role');
const Guser = require('./schemes/Guser');
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


const randomPass = () => {
    let a = Math.round(Math.random() * 11);
    let passw = a % 3 == 0 ? Math.round(Math.random() * 9) :
    a % 3 == 1 ? String.fromCharCode(Math.round(Math.random() * (90 - 65) + 65)) :
    String.fromCharCode(Math.round(Math.random() * (122 - 97) + 97));

    for (let i = 0; i < 20; i++) {
        if(Math.round(Math.random() * 11) % 2 == 0) {
            passw += Math.round(Math.random() * 9);
        }
        else {
            if(Math.round(Math.random() * 11) % 2 == 0) {
                passw += String.fromCharCode(Math.round(Math.random() * (90 - 65) + 65));
            }
            else {
                passw += String.fromCharCode(Math.round(Math.random() * (122 - 97) + 97));
            }
        }
    }
    return passw;
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
            const token = generateAccessToken(user._id, user.roles);
            res.cookie("auth",'Bearer '+ token)
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
            res.cookie("auth",'Bearer '+ token)
            return res.redirect("/")

        } catch(e) {
            console.log(e);
            res.status(400).json({message: "error"})

        }
    }

    async gLogin(req, res) {
        try {
            const email = await req.user.email;
            const username = await req.user.displayName;
            console.log(email)
            console.log(username)
            var user = await User.findOne({email})
            if(!user) {
                const userRole = await Role.findOne({value: "USER"})
                const hashPassword = await bcrypt.hashSync(randomPass(), salt);
                user = new User({username, email, password: hashPassword, roles: [userRole.value]})
                await user.save();
            }
            const token = generateAccessToken(user._id, user.roles);
            res.cookie("auth",'Bearer '+ token)
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