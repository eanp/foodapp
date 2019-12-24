require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');
const {
    auth
} = require('../middleware');


router.post('/login', (req, res) => {
    const {
        username,
        password
    } = req.body;
    const user = 'SELECT * FROM users WHERE username=?';

    mysql.execute(user, [username], (err, result, field) => {
        if (result.length > 0) {
            if (bcrypt.compareSync(password, result[0].password)) {

                const auth = jwt.sign({
                    username
                }, process.env.APP_KEY);

                res.send({
                    succes: true,
                    auth

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


// login 



// register user
router.post('/', (req, res) => {
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


router.get('/:id', auth, (req, res) => {
    const {
        id
    } = req.params;

    const sql = 'SElECT * FROM users WHERE id=?'
    mysql.execute(sql, [id], (err, result, field) => {
        res.send({
            success: true,
            data: result[0]
        })
        console.log(user);
    })

})


module.exports = router;