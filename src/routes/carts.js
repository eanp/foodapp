require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');
const {
    auth,
    roleUser
} = require('../middleware');


// Item Controller (CRUD)

// Employee register item (CREATE)
router.post('/', (req, res) => {
    const {
        id_user,
        id_item,
        item_quantity,
    } = req.body;
    const is_active = [0];
    const created_cart_on = new Date();
    const updated_cart_on = new Date();
    const sql = `INSERT INTO carts (id_user,id_item,item_quantity,is_active,created_cart_on,updated_cart_on) VALUES (?,?,?,?,?,?)`;
    mysql.execute(sql, [id_user, id_item, item_quantity, is_active, created_cart_on, updated_cart_on], (err, result, field) => {
        res.send(result);
        console.log(err);
    })

})


// user get all cart (READ)
router.get('/', (req, res) => {
    mysql.execute('SELECT * FROM carts', [], (err, result, field) => {
        res.send(result);
    })
})

// user edit cart (UPDATE)
router.put('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        id_user,
        id_item,
        item_quantity,
    } = req.body;
    const updated_cart_on = new Date();
    const sql = `UPDATE carts SET id_user=?, id_item=?, item_quantity=?,updated_cart_on=? WHERE id=?`;
    mysql.execute(sql, [id_user, id_item, item_quantity, updated_cart_on, id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// user delete cart (DELETE)
router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM carts WHERE id=?';
    mysql.execute(sql, [id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// employee detail user 
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

// Order Controller (CR)

// user order cart (CREATE)
router.put('/order/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        rating,
        review,
    } = req.body;
    const is_active = 1;
    const created_feedback_on = new Date();
    const sql = `UPDATE carts SET rating=?, review=?, is_active=?, created_feedback_on=? WHERE id=?`;
    mysql.execute(sql, [rating, review, is_active, created_feedback_on, id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })

})


// user get all cart (READ)
router.get('/', (req, res) => {
    mysql.execute('SELECT * FROM carts WHERE', [], (err, result, field) => {
        res.send(result);
    })
})
module.exports = router;