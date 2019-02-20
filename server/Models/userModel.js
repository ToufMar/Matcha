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
    }
}
