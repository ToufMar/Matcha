var sql = require('../db/db');
var mail = require('./mail');
const bcrypt = require('bcrypt');
const JWT = require('../Auth/serverAuth');
const userModel = require('../Models/userModel');

const User = {
    getAll: (req, res, next) => {
        userModel.getAllUsers((results) => {
            res.send(JSON.stringify({
                "status": 200,
                "error": null,
                "response": results
            }))
        })
    },

    getUser:  (req, res, next) => {
        userModel.getUserByName(req.params.name, (results) => {
            res.send(JSON.stringify(results));
        })
    },

    inscription: (req, res, next) => {
        var PostData = req.body;

        sql.query("SELECT * FROM `users` WHERE login=? OR email=?", [PostData.login, PostData.email], (err, results, fields) => {
            if (err) throw err;
            if (results.length > 0) {
                res.send(JSON.stringify({
                    "status": 500,
                    "error": err,
                    "response": 'user already exists'
                }))
            } else {
                if (!PostData.name || !PostData.login || !PostData.email || !PostData.password){
                    res.send(JSON.stringify({
                        "status": 500,
                        "error": err,
                        "response": 'Infos are missing'
                    }))
                } else {
                    bcrypt.hash(PostData.password, 10, (err, hashed) => {
                        let token =  Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        let link = req.protocol + '://' + req.get('host') + '/api/users/verifyMail?name=' + PostData.name + '&token=' + token;
                        mail.inscription(link)
                        PostData.token = token;
                        PostData.password = hashed;
                        
                        sql.query('INSERT INTO users SET ?', PostData, (error, results, fields) => {
                            if (error) throw error;
                            const token = JWT.signToken(PostData);
                        res.send({token: token});
                    })
                })
            }
        }
        })
    },

    connect: (req, res, next) => {
        let postData = req.body;
        sql.query('SELECT * FROM users WHERE login=? OR email=?', [postData.login_email, postData.login_email], (err, results, fields) =>{
            if (results.length === 0){
                res.send(JSON.stringify({
                    "status": 500,
                    "error": err,
                    "response": 'Mail or Login invalid'
                }))
            } else {
                bcrypt.compare(postData.password, results[0].password).then((result) => {
                    if (result){
                        console.log(results)
                        const token = JWT.signToken(PostData);
                        res.send(JSON.stringify({
                        "status": 200,
                        "error":  null,
                        "response": "User connecté",
                        "token": token,
                    }))} else {
                        res.send(JSON.stringify({
                            "status": 401,
                            "error":  true,
                            "response": "Password Invalid"
                        }))
                    }
                })
            }
        })
    },

    verifyMail: (req, res, next) => {
        sql.query('SELECT token FROM users WHERE name=?', req.query.name, (err, results) => {
        if (results[0].token !== req.query.token){

            res.send(JSON.stringify({
            "status": 500,
            "error": err,
            "response": "L'url transmis ne correspond a rien. Deso Wola"
            }))

        } else {
            sql.query('UPDATE users SET validEmail=1 WHERE token=?', req.query.token, (error, results) => {
            if (error) throw error;
            res.send("User confirmed");
            })
        }
        })
    },

    deleteUser: (req, res, next) => {
        var DeleteData = req.body;
        sql.query('DELETE FROM users WHERE name=?', DeleteData.name, (error, results, fields) => {
        if (error) throw error;
        res.send(JSON.stringify(results));
        })
    }
}

module.exports = User;