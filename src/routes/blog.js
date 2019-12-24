const router = require('express').Router();
const mysql = require('../dbconfig');

// ambil data
router.get('/', (req, res) => {
    // res.send('Hello from router');
    mysql.execute('SELECT * FROM blog', [], (err, result, field) => {
        res.send(result);
        // mysql.close();
    })
})

// membuat data
router.post('/', (req, res) => {
    const {
        title,
        body
    } = req.body;
    const created_on = new Date();
    const updated_on = new Date();
    const sql = 'INSERT INTO blog (title,body,created_on,updated_on) VALUES(?,?,?,?)';

    mysql.execute(sql, [title, body, created_on, updated_on], (err, result, field) => {
        console.log(err);
        res.send(result);
    })
})

// mengupdate/edit data
router.put('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const {
        title,
        body
    } = req.body;
    const updated_on = new Date();
    const sql = `UPDATE blog SET title=?, body=?, updated_on=? WHERE id=?`;

    mysql.execute(sql, [title, body, updated_on, id], (err, result, field) => {
        console.log(err);
        res.send(result);
    })

})

// menghapus data
router.delete('/:id', (req, res) => {
    const {
        id
    } = req.params;
    const sql = 'DELETE FROM blog WHERE id=?';
    mysql.execute(sql, [id], (err, result, field) => {
        res.send(result);
        console.log(err);
    })
})

//export
module.exports = router;