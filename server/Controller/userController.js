var sql = require('../db/db');
var mail = require('./mail');
const bcrypt = require('bcrypt');
const JWT = require('../Auth/serverAuth');
const userModel = require('../Models/userModel');

let emailVerification = (email) => {
    let reg = /^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()\.,;\s@\"]+\.{0,1})+[^<>()\.,;:\s@\"]{2,})$/;
    return (reg.test(email));
}

let loginVerication = (login) => {
    let reg = /^[a-zA-Z0-9_-]{5,15}$/;
    return (reg.test(login));
}

let passwordVerification = (password) => {
    let reg = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{8,}$/;
    return (reg.test(password));
}

let datasVerification = (PostData) => {
    if (!PostData.lastName || !PostData.firstName || !PostData.login || !PostData.email || !PostData.password) {
        return {
            "status": 500,
            "response": 'Infos are missing'
        }
    } else if (!emailVerification(PostData.email)) {
        return {
            status: 500,
            response: 'mail not valid'
        }
    } else if (!loginVerication(PostData.login)) {
        return {
            status: 500,
            response: 'login not valid'
        }
    } else if (!passwordVerification(PostData.password)) {
        return {
            status: 500,
            response: 'password not valid'
        }
    } else {
        return true;
    }
}


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

    getUser: (req, res, next) => {
        userModel.getUserByName(req.params.name, (results) => {
            res.send(JSON.stringify(results));
        })
    },

    inscription: (req, res, next) => {
        var PostData = req.body;

        if (datasVerification(PostData) !== true) {
            res.send(datasVerification(PostData));
        } else {
            userModel.IfExists(PostData, (results) => {
                if (results.bool === true) {
                    res.status(500).send({
                        "status": 500,
                        "exists": true,
                        "response": 'user already exists'
                    });
                } else {
                    bcrypt.hash(PostData.password, 10, (err, hashed) => {
                        let token = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
                        let link = req.protocol + '://' + req.get('host') + '/api/users/verifyMail?login=' + PostData.login + '&token=' + token;
                        mail.inscription(link, PostData.email)
                        PostData.emailToken = token;
                        PostData.password = hashed;
                        userModel.inscriptionInsertUser(PostData, (results) => {
                            if (results) {
                                const token = JWT.signToken(PostData);
                                res.send({ token: token });
                            }
                        })
                    })
                }
            })
        }
    },

    connect: (req, res, next) => {
        let postData = req.body;
        userModel.IfExists(postData, (results) => {
            if (!results.bool) {
                res.send({
                    "status": 500,
                    "error": true,
                    "response": 'Mail or Login invalid'
                })
            } else if (results.results[0].validEmail === 0){
                    res.send(JSON.stringify({
                        "status": 401,
                        "error": true,
                        "response": "Email non verifie"
                    }))
                }
                bcrypt.compare(postData.password, results.results[0].password).then((result) => {
                    if (result) {
                        const token = JWT.signToken(postData);
                        res.end(JSON.stringify({
                            "status": 200,
                            "error": null,
                            "response": "User connecté",
                            "token": token,
                        }))
                    } else {
                        res.end(JSON.stringify({
                            "status": 401,
                            "error": true,
                            "response": "Password Invalid"
                        }))
                    }
                }).catch((err) => console.log(err))
        })
    },

    verifyMail: (req, res, next) => {
        userModel.getMailInfos(req.query.login, (results) => {
            if (results[0].validEmail === 1){
                res.send(JSON.stringify({
                    "status": 200,
                    "response": "Vous avez deja confirmé votre mail"
                }))
            }else if (results[0].emailToken !== req.query.token) {
                res.send(JSON.stringify({
                    "status": 500,
                    "response": "L'url transmis ne correspond a rien. Deso Wola"
                }))
            
            } else {
                userModel.setValidToTrue(req.query.token, (results) => {
                    res.send({results, user: 'confirmed'});
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