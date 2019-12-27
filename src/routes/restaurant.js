require('dotenv').config();

const router = require('express').Router();
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const mysql = require('../dbconfig');
const {
    auth,
    roleRestaurant
} = require('../middleware');
// const knex = require('knex')({
//     client: 'mysql2',
//     connection: {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'foodapp'
//     }
// });
//
const multer = require('multer');
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, './storage/image/');
    },
    filename: function (req, file, cb) {
        cb(null, file.originalname);
    }
})

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

router.put('/foto/:id', upload.single('image'), (req, res) => {
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

//
// Item Controller (CRUD)
//
// router.get('/:id', auth, roleRestaurant, async (req, res) => {
//     try {
//         let id = req.params.id;
//         let items = await knex('items').where('restaurant_id', id);
//         res.json({
//             succes: true,
//             data: items
//         });
//     } catch (e) {
//         console.log(e);
//     }
// })
// employee get all item(READ)
router.get('/:id', auth, roleRestaurant, (req, res) => {
    const {
        id
    } = req.params;
    mysql.execute(`SELECT * FROM items WHERE restaurant_id=${id}`, [], (err, result, field) => {
        res.send({
            food_id: result['id'],
            food_name: result['itemname'],
            food_price: result['price'],
            food_desc: result['description'],
            food_category: result['category']
        });
    })
})
// SELECT * FROM items WHERE restaurant_id=${id}

// Restaurant register item (CREATE)
const restaurant_id = 'SELECT * FROM restaurants INNER JOIN users restaurants.user_id=users.id';

router.post('/:?', (req, res) => {
    const {
        itemname,
        price,
        image,
        description,
        category,
    } = req.body;
    const restaurant_id = req.params;
    const created_on = new Date();
    const updated_on = new Date();
    const sql = `INSERT INTO items (itemname,price,image,description,category,restaurant_id,created_on,updated_on) VALUES (?,?,?,?,?,?,?,?)`;
    mysql.execute(sql, [itemname, price, image, description, category, restaurant_id, created_on, updated_on], (err, result, field) => {
        res.send(result);
        console.log(err);
    })


})



// employee edit item (UPDATE)
router.put('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        itemname,
        price,
        image,
        description,
        category,
        restaurant_id
    } = req.body;
    const updated_on = new Date();
    const sql = `UPDATE items SET itemname=?, price=?, image=?, description=?, category=?, restaurant_id=?, updated_on=? WHERE id=?`;
    mysql.execute(sql, [itemname, price,
        image, description, category, restaurant_id, updated_on, id
    ], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

// employee delete user (DELETE)
router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM items WHERE id=?';
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


module.exports = router;