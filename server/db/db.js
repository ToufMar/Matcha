'user strict';
var mysql = require('mysql');

//local mysql db connection
var connection = mysql.createConnection({
    host     : 'localhost',
    user     : 'root',
    password : 'rootroot',
    database : 'matcha',
    port: '3306'
});

connection.connect(function(err) {
    if (err) {
        console.log(err)
    } else {
        console.log('Connected')
    }
});

module.exports = connection;