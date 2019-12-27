require('dotenv').config();
const mysql = require('mysql2');

// es6
const {
    DB_SERVER,
    DB_USER,
    DB_PASSWORD,
    DB_DATABASE
} = process.env

// config
const config = {
    host: process.env.DB_SERVER,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
}

const myconn = mysql.createConnection(config);
module.exports = myconn;