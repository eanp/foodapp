
router.get('/', (req, res) => {

    const query = req.query
    let where = ''
    let sort = ''
    let page = 'LIMIT 6 OFFSET 0'
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
        const offset = (Number(query.page) * 6) - 6
        page = `LIMIT 6 OFFSET ${offset}`
        full_url += `page=${query.page}&`
    } else {
        query.page = 1
    }

    let sql1 = `SELECT COUNT(*) AS result FROM items`

    let sql2 = `SELECT items.id, items.itemname AS item, items.price, items.description, items.image,
  items.created_on, items.updated_on FROM items ${where} ${sort} ${page}`

    db.execute(sql1, (err, result, field) => {
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
            db.execute(sql2, (err2, res2, fie2) => {
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

                    if (Number(query.page) === Math.ceil(Number(result[0].result) / 6)) {
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
                            pages: Math.ceil(Number(result[0].result) / 6),
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

// router.get('/image/:id', auth, all, (req, res) => {
//     const { id } = req.params
//     db.execute(`SELECT image FROM items WHERE id = ?`, [id], (err, result, field) => {
//         if (err) {
//             console.log(err)
//             res.send({
//                 uuid: uuidv1(),
//                 status: 400,
//                 msg: err,
//             })
//         } else if (result.length === 0) {
//             res.send({
//                 uuid: uuidv1(),
//                 status: 400,
//                 msg: "No data retrieved!",
//             })
//         } else {
//             res.send({
//                 uuid: uuidv1(),
//                 status: 200,
//                 data: result
//             })
//         }
//     })
// });

module.exports = router;