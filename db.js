const mysql = require('mysql');
var config = require('./config');


var db = mysql.createConnection({
    host: config.DB_HOST, // hostname
    user: config.DB_USER, // username
    password: config.DB_PASS, // password
    database: config.DB_NAME // database name
});

db.connect((err) => {
    if (err) {
        console.log('Connect Fail', err);
        return;
      }
      console.log('Connection established');
});

module.exports = { db };