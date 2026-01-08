var mysql = require('mysql2');
var util = require('util');
require("dotenv").config();



// create connection to the database

var connection = mysql.createConnection({
    host:process.env.Host, 
    user:process.env.User,
    password:process.env.Password,
    database:process.env.Database,
});

var exe = util.promisify(connection.query).bind(connection);

module.exports =exe;