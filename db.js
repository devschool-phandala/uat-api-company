const mysql = require('mysql');

var db = mysql.createConnection({
    host: 'localhost', // hostname
    user: 'root', // username
    password: 'toor', // password
    database: 'company' // database name
});

db.connect((err) => {
    if (err) {
        console.log('Connect Fail', err);
        return;
      }
      console.log('Connection established');
});

module.exports = {db};