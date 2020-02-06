require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');
const {
    auth,
    roleAdmin
} = require('../middleware');
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage/image/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

// Admin (CRUD) Restaurant
// Admin Upload Foto
const fileFilter = (req, file, callback) => {
    if (!file.originalname.match(/\.(jpg|jpeg|png|JPG|JPEG|PNG)$/)) {
        return callback(new Error('Only file image'), false)
    }
    callback(null, true);
}
const upload = multer({
    storage: storage,
    fileFilter: fileFilter
});

router.put('/resto/foto/:id', auth, upload.single('image'), (req, res) => {
    const {
        id
    } = req.params;
    const image = (req.file.originalname);
    const sql = `UPDATE restaurants SET image=? WHERE id=?`;
    mysql.execute(sql, [image, id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

router.put('/items/foto/:id', auth, upload.single('image'), (req, res) => {
    const {
        id
    } = req.params;
    const image = (req.file.originalname);
    const sql = `UPDATE items SET image=? WHERE id=?`;
    mysql.execute(sql, [image, id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// Admin Register Resto Create
router.post('/resto/', auth, (req, res) => {
    const image = null;
    const {
        name,
        user_id,
        description,
        longtitude,
        latitude
    } = req.body;
    const created_on = new Date();
    const updated_on = new Date();
    const sql = `INSERT INTO restaurants (name,user_id,description,image,longtitude, latitude,created_on,updated_on) VALUES (?,?,?,?,?,?,?,?)`;
    mysql.execute(sql, [name, user_id, description, image, longtitude, latitude, created_on, updated_on], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// admin edit Resto (UPDATE)
router.put('/resto/:id', auth, (req, res) => {
    const {
        id
    } = req.params;
    const {
        name,
        user_id,
        description,
        longtitude,
        latitude
    } = req.body;
    const updated_on = new Date();
    const sql = `UPDATE restaurants SET name=?, user_id=?, description=?, longtitude=?, latitude=?, updated_on=? WHERE id=?`;
    mysql.execute(sql, [name, user_id, description, longtitude, latitude, updated_on, id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// admin delete restaurants (DELETE)
router.delete('/resto/:id', auth, (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM restaurants WHERE id=?';
    mysql.execute(sql, [id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// --------------------------------------------------------
// employee get all item (READ)
router.get('/resto/', (req, res) => {
    const sql = `SELECT id, name, user_id, description, image, longtitude, latitude FROM restaurants`;
    mysql.execute(sql, [], (err, result, field) => {
        res.send({
            status: 200,
            data: result
        });
    })
})

// admin get all user (READ)
router.get('/user/', auth, (req, res) => {
    mysql.execute('SELECT id, username, users.role_id AS rule, role FROM users INNER JOIN roles ON users.role_id=roles.role_id', [], (err, result, field) => {
        res.send({
            status: 200,
            result
        });
    })
})

// ---------------------------------------------------------

//
// Admin (CRUD) User
//

// admin register user (CREATE)
router.post('/user/', auth, (req, res) => {
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

// admin edit user (UPDATE)
router.put('/user/:id', auth, (req, res) => {
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
router.delete('/user/:id', auth, (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM users WHERE id=?';
    mysql.execute(sql, [id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})


// Admin register item (CREATE)
router.post('/items/', auth, (req, res) => {
    const {
        restaurant_id,
        itemname,
        price,
        description,
        category,
    } = req.body;
    const created_on = new Date();
    const updated_on = new Date();
    const sql = `INSERT INTO items (itemname,price,description,category,restaurant_id,created_on,updated_on) VALUES (?,?,?,?,?,?,?)`;
    mysql.execute(sql, [itemname, price, description, category, restaurant_id, created_on, updated_on], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

router.put('/items/:id', auth, (req, res) => {
    const {
        id
    } = req.params;
    const {
        restaurant_id,
        itemname,
        price,
        description,
        category,
    } = req.body;
    const updated_on = new Date();
    const sql = `UPDATE items SET itemname=?, price=?, restaurant_id=?, description=?, category=?, updated_on=? WHERE id=?`;
    mysql.execute(sql, [itemname, price,
        restaurant_id, description, category, , updated_on, id
    ], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

router.delete('/items/:id', auth, (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM items WHERE id=?';
    mysql.execute(sql, [id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

router.get('/items', (req, res) => {

    const query = req.query
    let where = ''
    let sort = ''
    let page = 'LIMIT 15 OFFSET 0'
    let full_url = ''
    const url = 'http://localhost:4000/'

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

    let sql2 = `SELECT items.id, itemname, price, items.image, items.description, items.category AS id_cat,category.category AS category, items.restaurant_id AS id_resto, restaurants.name as restaurant, items.created_on FROM items INNER JOIN category ON items.category=category.id INNER JOIN restaurants ON items.restaurant_id=restaurants.id ${where} ${sort} ${page}`

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
