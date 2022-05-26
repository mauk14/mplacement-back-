const jwt = require('jsonwebtoken')
const User = require("./schemes/User")
const Role = require("./schemes/Role")
const {secret} = require("./config")

module.exports = function () {
    return async function (req, res, next) {
        if (req.method === "OPTIONS") {
            next()
        }
        if(req.cookies.auth){
            try {
                    const token=req.cookies.auth.split(' ')[1]
                    if (!token) {
                        return res.status(403).json({message: "User not authorized"})
                    }
                    const decoded=jwt.decode(token, secret)

                    if(decoded.exp<new Date().getTime()/1000){
                        res.clearCookie("auth")
                        res.render("catalog",{user:res.user,auth:res.user})
                    }
                    else{
                        const user = jwt.verify(token, secret)
                        res.user= await User.findById(user.id)

                    }

                next();
            } catch (e) {
                console.log(e)
                return res.status(403).json({message: "User not authorized"})
            }
        }
        else{
            res.user =null;
            next();
        }

    }
};