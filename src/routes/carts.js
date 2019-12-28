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

// User create cart (CREATE)
router.post('/:id_user', auth, roleUser, (req, res) => {
    const {
        id_user
    } = req.params;
    const {
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
router.get('/:id_user', auth, roleUser, (req, res) => {
    const {
        id_user
    } = req.params;
    const is_active = 0;
    mysql.execute('SELECT id_item, itemname, item_quantity FROM carts INNER JOIN  WHERE id_user=? and is_active=?', [], (err, result, field) => {
        res.send({
            user: id_user,
            status: 200,
            result: result
        });
    })
})

// user edit cart (UPDATE)
router.put('/:id', auth, roleUser, (req, res) => {
    const {
        id
    } = req.params;
    const {
        id_item,
        item_quantity,
    } = req.body;
    const is_active = [0];
    const updated_cart_on = new Date();
    const sql = `UPDATE carts SET  id_item=?, item_quantity=?,updated_cart_on=? WHERE id=? and is_active=?`;
    mysql.execute(sql, [id_item, item_quantity, updated_cart_on, id, is_active], (err, result, field) => {
        res.send({
            cart_id: id,
            status: 200,
            result: result
        });
        console.log(err);
    })
})

// user delete cart (DELETE)
router.delete('/:id', auth, roleUser, (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM carts WHERE id=?';
    mysql.execute(sql, [id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// Order Controller (CR)
// user order cart (CREATE)
router.put('/order/:id', auth, roleUser, (req, res) => {
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

// user get all complete order (READ)
router.get('/order/:id_user', auth, roleUser, (req, res) => {
    const {
        id_user
    } = req.params;
    const is_active = 1;
    mysql.execute('SELECT id_item, item_quantity, rating, review FROM carts WHERE id_user=? and is_active=?', [], (err, result, field) => {
        res.send({
            user: id_user,
            status: 200,
            result: result
        });
    })
})

module.exports = router;