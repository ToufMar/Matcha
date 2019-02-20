var jwt = require('jsonwebtoken');
var User = require('../Controller/userController');
const {SECRET_KEY} = require('dotenv').config().parsed;

const authJWT = {
    signToken: (user) => {
        delete user.password;
        return jwt.sign(user, SECRET_KEY)
    },

    verifyToken: (req, res, next) => {
        const token = req.get('token') || req.body.token || req.query.token;
        if (!token) return (res.json({error: true, message:"No token "}));

        jwt.verify(token, SECRET_KEY, (err, decodedData) => {
            if (err) return res.json({error: true, message:"Invalid token"});
            next();
        })
    }
}

module.exports =  authJWT;