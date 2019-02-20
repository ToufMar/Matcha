const sql = require('../db/db')

module.exports = userModel = {

    getUserByName: (name, fn) => {
        sql.query('SELECT * FROM users WHERE name=?', name, (err, results, fields) => {
            if (err) throw err;
            fn(results)
        })
    },

    getAllUsers: (fn) => {
        sql.query('SELECT * FROM users', (error, results, fields) => {
            if (error) throw error;
            fn(results);
        })
    },

    IfExists:  (PostData, fn) => {
        sql.query("SELECT * FROM `users` WHERE login=? OR email=?", [PostData.login, PostData.email], (error, results, fields) => {            
            if (error) throw error;
            (results.length > 0) ? fn({bool: true, results: results}) : fn({bool: false, results: results});
        })
    },

    inscriptionInsertUser: (PostData, fn) => {
        sql.query('INSERT INTO users SET ?', PostData, (error, results, fields) => {
            if (error) throw error;
            fn(results);
        })
    },

    getMailInfos: (login, fn) => {
        sql.query('SELECT emailToken, validEmail FROM users WHERE login=?', login, (err, results) => {
            if (err) throw err;
            fn(results);
        })
    },

    setValidToTrue: (token, fn) => {
        sql.query('UPDATE users SET validEmail=1 WHERE emailToken=?', token, (error, results) => {
            if (error) throw error;
            fn(results);
            // res.send("User confirmed");
        })
    }
}
        
