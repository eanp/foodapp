require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');
const {
    auth
} = require('../middleware');

// login
router.post('/login/', (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = 'SELECT * FROM users WHERE username=?';
    mysql.execute(user, [username], (err, result, field) => {
        const roles = result[0].role_id;
        if (result.length > 0) {
            if (bcrypt.compareSync(password, result[0].password)) {
                const auth = jwt.sign({
                    username
                }, process.env.APP_KEY);
                const token = auth;
                const is_revoked = 0;
                const created_on = new Date();
                const updated_on = new Date();
                const sql = `INSERT INTO revoked_token (token, is_revoked,created_on,updated_on) VALUES (?,?,?,?)`;
                mysql.execute(sql, [token, is_revoked, created_on, updated_on], (err, result, field) => {
                    res.send({
                        succes: true,
                        msg: result,
                        // msg: result['insertId'],
                        token: auth,
                        data: roles
                    });
                    console.log(err);
                })
            } else {
                res.send({
                    succes: false,
                    msg: 'incorrect password'
                })
            }
        } else {
            res.send({
                succes: false,
                msg: 'username not found'
            })
        }
    })
})

// logout
router.put('/logout/', auth, (req, res) => {
    const token = req.headers.auth_token;
    const is_revoked = '1';
    const sql = `UPDATE revoked_token SET is_revoked=? WHERE token=? `;
    mysql.execute(sql, [is_revoked, token], (err, result, field) => {
        res.send({
            result,
            msg: req.headers.auth_token
        });
        console.log(err);
    })
})

// register user
router.post('/register/', (req, res) => {
    const {
        username,
        password
    } = req.body;
    const enc_pass = bcrypt.hashSync(password);
    const created_on = new Date();
    const updated_on = new Date();
    const sql = 'INSERT INTO users (username,password,created_on,updated_on) VALUES(?,?,?,?)';
    mysql.execute(sql, [username, enc_pass, created_on, updated_on], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})


module.exports = router;