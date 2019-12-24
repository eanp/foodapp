require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');
const {
    auth
} = require('../middleware');

// Admin Controller (CRUD)

// admin register user (CREATE)
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


// admin get all user (READ)
router.get('/', (req, res) => {
    mysql.execute('SELECT * FROM users', [], (err, result, field) => {
        res.send(result);
    })
})

// admin edit user (UPDATE)
router.put('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        username,
        role_id
    } = req.body;
    const updated_on = new Date();
    const sql = `UPDATE users SET username=?, role_id=?, updated_on=? WHERE id=?`;
    mysql.execute(sql, [username, role_id, updated_on, id], (err, result, field) => {
        console.log(err);
        res.send(result);
    })
})

// admin delete user (DELETE)
router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM users WHERE id=?';
    mysql.execute(sql, [id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// admin detail user 
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