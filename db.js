const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost', // hostname
    user: 'root', // username
    password: 'toor', // password
    database: 'company' // database name
});

db.connect((err) => {
    if (err) {
        console.log(err);
    } 
    console.log('Connected to database');
});

module.exports = {db};