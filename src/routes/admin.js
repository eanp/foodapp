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

router.put('/resto/foto/:id', upload.single('image'), (req, res) => {
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


// Admin Register Resto Create
router.post('/resto/', auth, roleAdmin, (req, res) => {
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
router.put('/resto/:id', auth, roleAdmin, (req, res) => {
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
router.delete('/resto/:id', auth, roleAdmin, (req, res) => {
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
router.get('/resto/', auth, roleAdmin, (req, res) => {
    const sql = `SELECT name, user_id, description, image, longtitude, latitude FROM restaurants`;
    mysql.execute(sql, [], (err, result, field) => {
        res.send({
            status: 200,
            result
        });
    })
})

// admin get all user (READ)
router.get('/user/', auth, roleAdmin, (req, res) => {
    mysql.execute('SELECT id, username, role_id FROM users', [], (err, result, field) => {
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
router.post('/user/', auth, roleAdmin, (req, res) => {
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
router.put('/user/:id', auth, roleAdmin, (req, res) => {
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
router.delete('/user/:id', auth, roleAdmin, (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM users WHERE id=?';
    mysql.execute(sql, [id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

module.exports = router;