require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');





// Guest Controller (CRUD)
// Guest get all item (READ)


router.get('/', (req, res) => {

    const sql = `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_category,restaurant_id, name, category.category FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id`

    mysql.execute(sql, [], (err, result, field) => {
        res.send(result);
    })
})


// get items by resto id
router.get('/resto/:restaurant_id', (req, res) => {
    const {
        restaurant_id
    } = req.params;
    const sql = `SELECT items.id, itemname, price, items.image, name, category.category, items.description FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id WHERE items.restaurant_id=?`
    mysql.execute(sql, [restaurant_id], (err, result, field) => {
        res.send({
            status: 200,
            result
        });
    })
})

// item detail 
router.get('/item/:id', (req, res) => {
    const {
        id
    } = req.params;
    const showcase_sql =
        `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_category,restaurant_id, name, category.category FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id WHERE items.id=?`;

    const sql = `SELECT items.id, itemname, price, items.image, name, category.category, items.description FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id WHERE items.restaurant_id=?`
    mysql.execute(sql, [id], (err, result, field) => {
        res.send({
            status: 200,
            result
        });
    })
})








module.exports = router;