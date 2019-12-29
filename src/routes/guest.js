require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');

// Guest Controller 
// guest search
router.get('/search', (req, res) => {
    const {
        name,
        price,
        rating
    } = req.query
    if (name) {
        const sql = `SELECT items.id,itemname, price, items.image, restaurants.name as restaurant,                  category.category as category 
                    FROM items
                    INNER JOIN restaurants on items.restaurant_id=restaurants.id
                    INNER JOIN category on items.category=category.id
							WHERE itemname LIKE '%${name}%'`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (price) {
        const sql = `SELECT items.id,itemname, price, items.image, restaurants.name as restaurant,                  category.category as category 
                    FROM items
                    INNER JOIN restaurants on items.restaurant_id=restaurants.id
                    INNER JOIN category on items.category=category.id
                    WHERE price LIKE '%${price}%'`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (rating) {
        const sql = `SELECT items.id,itemname, price, items.image, restaurants.name as restaurant,                  category.category as category, AVG(rating) as rating
                    FROM items
                    INNER JOIN restaurants on items.restaurant_id=restaurants.id
                    INNER JOIN category on items.category=category.id
                    INNER JOIN carts on items.id=carts.id_item
                WHERE carts.rating LIKE '%${rating}%'`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else {
        res.send({
            success: false,
            msg: 'your searching is not found'
        })
    }
})

// sort 
router.get('/sort/', (req, res) => {
    const {
        name,
        price,
        rating,
        updated_on
    } = req.query
    if (name) {
        const name = req.query.name;
        const sql =
            `SELECT items.id,itemname, price, items.image, restaurants.name as restaurant,                  category.category as category 
                    FROM items
                    INNER JOIN restaurants on items.restaurant_id=restaurants.id
                    INNER JOIN category on items.category=category.id
							ORDER BY itemname ${name}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (price) {
        const price = req.query.price;
        const sql = `SELECT items.id,itemname, price, items.image, restaurants.name as restaurant,                  category.category as category 
                    FROM items
                    INNER JOIN restaurants on items.restaurant_id=restaurants.id
                    INNER JOIN category on items.category=category.id
							ORDER BY price ${price}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (rating) {
        const sql = `SELECT items.id,itemname, price, items.image, restaurants.name as restaurant,                      rating, category.category as category 
                            FROM items
                            INNER JOIN restaurants on items.restaurant_id=restaurants.id
                            INNER JOIN category on items.category=category.id
                            INNER JOIN carts ON items.id=carts.id_item
                                    ORDER BY rating ${rating}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (updated_on) {
        const sql = `SELECT items.id,itemname, price, items.image, restaurants.name as restaurant, 
                    category.category as category, items.updated_on AS update_at
                    FROM items
                    INNER JOIN restaurants on items.restaurant_id=restaurants.id
                    INNER JOIN category on items.category=category.id
            
                            ORDER BY items.updated_on ${updated_on}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else {
        res.send({
            success: false,
            msg: 'nothing to display'
        })
    }
})

// get page (pagination)
router.get('/page/', (req, res) => {
    const {
        page,
        limits
    } = req.query;
    if (page == 1) {
        const initial = page - 1;
        const sql = `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_category,restaurant_id, name, category.category FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id
        ORDER BY id ASC LIMIT ${initial}, ${limits}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
            console.log(err)
        })
    } else if (page >= 2) {
        const initial = page * limits - limits;
        const sql = `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_category,restaurant_id, name, category.category FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id
        ORDER BY id ASC LIMIT ${initial}, ${limits}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
            console.log(err)
        })
    }
})

// get all item without pagination
router.get('/', (req, res) => {
    const sql = `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_category,restaurant_id, name, category.category FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id
    ORDER BY id ASC LIMIT 0,10`
    mysql.execute(sql, [], (err, result, field) => {
        res.send({
            status: 200,
            result
        });
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
    const sql =
        `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_category,restaurant_id, name, category.category, AVG(carts.rating) as rating, review FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id INNER JOIN carts ON items.id=carts.id_item 
        WHERE items.id=?`;
    mysql.execute(sql, [id], (err, result, field) => {
        const result_category = result[0].id_category;
        const item_result = result;
        const get_showcase = `SELECT items.id, itemname, price, items.image, items.description,                 items.category AS id_category,
                restaurant_id, name, category.category FROM items 
                INNER JOIN category on items.category = category.id 
                INNER JOIN restaurants on items.restaurant_id = restaurants.id
                WHERE items.category = ${result_category};`
        mysql.execute(get_showcase, [id], (err, result, field) => {
            res.send({
                status: 200,
                item_result,
                showcase: result
            });
        })
    })
})








module.exports = router;