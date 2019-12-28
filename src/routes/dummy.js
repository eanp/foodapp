router.get('/category/:category', (req, res) => {
    const {
        category
    } = req.params
    const sql = `SELECT name, price, image, category from item_data INNER JOIN
                 categories on categories.id_categories = item_data.id_categories WHERE category = ?`
    mysql.execute(sql, [category], (err, result, field) => {
        res.send(result)
    })
})
//
router.get('/page', (req, res) => {
    const {
        page,
        limits
    } = req.query
    if (page == 1) {
        const initial = page - 1
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto
                     ORDER BY name ASC LIMIT ${initial}, ${limits}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
            console.log(err)
        })
    } else if (page >= 2) {
        const initial = page * limits - limits
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto 
                     ORDER BY name ASC LIMIT ${initial}, ${limits}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    }
})

router.get('/search', (req, res) => {
    const {
        name,
        price,
        rating
    } = req.query
    if (name) {
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto WHERE name LIKE '%${name}%'`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (price) {
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto WHERE price = ${price}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (rating) {
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto WHERE rating = ${rating}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else {
        res.send({
            success: false,
            msg: 'nothing to display :('
        })
    }
})

router.get('/sort/asc', (req, res) => {
    const {
        name,
        price,
        rating,
        updated_on
    } = req.query
    if (name) {
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY name ASC`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (price) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY price ASC `
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (rating) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY rating ASC `
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (updated_on) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY updated_on ASC `
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

router.get('/sort/desc', (req, res) => {
    const {
        name,
        price,
        rating,
        updated_on
    } = req.query
    if (name) {
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY name desc`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (price) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY price desc `
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (rating) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY rating desc `
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (updated_on) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY updated_on desc `
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

module.exports = router


// showcase
router.get('/details/:name/:name_resto', (req, res) => {
    const {
        name,
        name_resto
    } = req.params
    const sql = `SELECT name, price, rating, item_data.descriptions, image, name_resto, category FROM item_data 
                 INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto 
                 INNER JOIN categories on categories.id_categories = item_data.id_categories 
                 WHERE (name = ? AND name_resto = ? )`
    mysql.execute(sql, [name, name_resto], (err, resuld, field) => {
        // const rating = result[0].rating
        const categories = resuld[0].category
        const sql = `SELECT name, price, rating, item_data.descriptions, image, name_resto, category FROM item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto 
                     INNER JOIN categories on categories.id_categories = item_data.id_categories where category LIKE ? LIMIT 5`
        mysql.execute(sql, ['%' + categories + '%'], (err, result, field) => {
            res.send({
                success: true,
                data: resuld,
                Suggest: result
            })
        })

    })
})

//input rating dan review
/* input review */
router.post('/inputreview', auth, role_user, (req, res) => {
    const {
        rating,
        review,
        name,
        id_item,
        id_user
    } = req.body
    const created_on = new Date()
    const updated_on = new Date()
    const sql = `INSERT INTO review (rating, review, name, id_item, id_user, created_on, updated_on) VALUES (?,?,?,?,?,?,?)`
    mysql.execute(sql, [rating, review, name, id_item, id_user, created_on, updated_on], (err, resuld, field) => {
        if (err == null) {
            const sql = `SELECT AVG(rating) AS rate from review WHERE id_item = ${id_item}`
            mysql.execute(sql, [], (err, result, field) => {
                var rating = result[0].rate
                if (err == null) {
                    const sql = `UPDATE item_data set rating = ${result[0].rate} WHERE id_item = ${id_item} `
                    mysql.execute(sql, [rating], (err, result, field) => {
                        console.log(id_item)
                        res.send(result)
                    })
                }
            })
        }
        res.send(resuld)
    })
})
//
router.get('/sort/asc', (req, res) => {
    const {
        name,
        price,
        rating,
        updated_on
    } = req.query
    if (name) {
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY name ASC`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (price) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY price ASC `
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (rating) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY rating ASC `
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (updated_on) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY updated_on ASC `
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

router.get('/sort/desc', (req, res) => {
    const {
        name,
        price,
        rating,
        updated_on
    } = req.query
    if (name) {
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY name desc`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (price) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY price desc `
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (rating) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY rating desc `
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    } else if (updated_on) {
        const sql = `SELECT name, price, image, name_resto from item_data 
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto ORDER BY updated_on desc `
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
// pagination

router.get('/page', (req, res) => {
    const {
        page,
        limits
    } = req.query
    if (page == 1) {
        const initial = page - 1
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto
                     ORDER BY name ASC LIMIT ${initial}, ${limits}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
            console.log(err)
        })
    } else if (page >= 2) {
        const initial = page * limits - limits
        const sql = `SELECT name, price, image, name_resto from item_data
                     INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto 
                     ORDER BY name ASC LIMIT ${initial}, ${limits}`
        mysql.execute(sql, [], (err, result, field) => {
            res.send(result)
        })
    }
})

//
// router.get('/search', (req, res)=>{
//     const {name, price, rating} = req.query
//     if (name){
//         const sql = `SELECT name, price, image, name_resto from item_data
//                      INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto WHERE name LIKE '%${name}%'`
//         mysql.execute(sql, [], (err, result, field)=>{
//             res.send(result)
//         })
//     } else if (price){
//         const sql = `SELECT name, price, image, name_resto from item_data
//                      INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto WHERE price = ${price}`
//         mysql.execute(sql, [], (err, result, field)=>{
//             res.send(result)
//         })
//     } else if (rating){
//         const sql = `SELECT name, price, image, name_resto from item_data
//                      INNER JOIN restaurant_data on restaurant_data.id_resto = item_data.id_resto WHERE rating = ${rating}`
//         mysql.execute(sql, [], (err, result, field)=>{
//             res.send(result)
//         })
//     } else {
//         res.send({
//             success: false,
//             msg : 'nothing to display :('
//         })
//     }
// })