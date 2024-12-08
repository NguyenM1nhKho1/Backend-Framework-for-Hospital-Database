const mysql = require('mysql2');

const database = mysql.createPool({
    host: 'localhost',
    user: 'root',
    password: 'bingchilling',
    database: 'hospitaldb'
});

module.exports = database;