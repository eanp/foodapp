require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');
const url = process.env.APP_URI;

// Guest Controller 

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
        `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_category,restaurant_id, name, category.category FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id WHERE items.id=?`;
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

// get all item without pagination
router.get('/zz', (req, res) => {
    const sql = `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_category,restaurant_id, name, category.category FROM items INNER JOIN category on items.category=category.id INNER JOIN restaurants on items.restaurant_id=restaurants.id
    ORDER BY id ASC LIMIT 0,100`
    mysql.execute(sql, [], (err, result, field) => {
        res.send({
            status: 200,
            result
        });
    })
})

// guest search
router.get('/zz', (req, res) => {
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
    } else {
        res.send({
            success: false,
            msg: 'your searching is not found'
        })
    }
})

router.get('/items', (req, res) => {

    const query = req.query
    let where = ''
    let sort = ''
    let page = 'LIMIT 15 OFFSET 0'
    let full_url = ''

    if (query.search) {
        let count = 1
        where += `WHERE`
        Object.keys(query.search).forEach(key => {
            if (Object.keys(query.search).length === 1) {
                where += ` items.${key} LIKE '%${query.search[key]}%'`
                full_url += `search[${key}]=${query.search[key]}&`
                count++
            } else if (Object.keys(query.search).length === count) {
                where += ` items.${key} LIKE '%${query.search[key]}%'`
                full_url += `search[${key}]=${query.search[key]}&`
                count++
            }
            else {
                where += ` items.${key} LIKE '%${query.search[key]}%' AND`
                full_url += `search[${key}]=${query.search[key]}&`
                count++
            }
        });
    }

    if (query.sort) {
        if (Object.keys(query.sort).length === 1) {
            sort += `ORDER BY`
            Object.keys(query.sort).forEach(key => {
                sort += ` items.${key} ${query.sort[key]}`
                full_url += `sort[${key}]=${query.sort[key]}&`
            });
        }
    }

    if (query.page) {
        const offset = (Number(query.page) * 15) - 15
        page = `LIMIT 15 OFFSET ${offset}`
        full_url += `page=${query.page}&`
    } else {
        query.page = 1
    }

    let sql1 = `SELECT COUNT(*) AS result FROM items`

    let sql2 = `SELECT * FROM items ${where} ${sort} ${page}`

    mysql.execute(sql1, (err, result, field) => {
        if (err) {
            console.log(err)
            res.send({
                status: 400,
                msg: err,
            })
        } else if (result.length === 0) {
            res.send({
                status: 400,
                msg: "No data retrieved!",
            })
        } else {
            mysql.execute(sql2, (err2, res2, fie2) => {
                if (err2) {
                    console.log(err2)
                    res.send({
                        status: 400,
                        msg: err2,
                    })
                } else if (res2.length === 0) {
                    res.send({
                        status: 400,
                        msg: "No data retrieved!",
                    })
                } else {

                    let prev = ''
                    let next = ''

                    let noPage = full_url.replace(/page=[0-9\.]+&/g, '')

                    prev = `${url}items?${noPage}page=${Number(query.page) - 1}`
                    next = `${url}items?${noPage}page=${Number(query.page) + 1}`

                    if (Number(query.page) === Math.ceil(Number(result[0].result) / 15)) {
                        prev = `${url}items?${noPage}page=${Number(query.page) - 1}`
                        next = ``
                    } else if (query.page <= 1) {
                        prev = ``
                        next = `${url}items?${noPage}page=${Number(query.page) + 1}`
                    }

                    res.send({
                        status: 200,
                        info: {
                            count: result[0].result,
                            pages: Math.ceil(Number(result[0].result) / 15),
                            current: `${url}items?${full_url}`,
                            next: next,
                            previous: prev
                        },
                        data: res2
                    })
                }
            })
        }
    })
});








module.exports = router;