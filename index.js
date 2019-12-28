require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const {
    auth
} = require('./src/middleware');
//
// const knex = require('knex')({
//     client: 'mysql',
//     connection: {
//         host: 'localhost',
//         user: 'root',
//         password: '',
//         database: 'foodapp'
//     }
// });

// Router
const admin = require('./src/routes/admin');
const restaurant = require('./src/routes/restaurant');
const user = require('./src/routes/user');
const carts = require('./src/routes/carts');
const guest = require('./src/routes/guest');

const app = express();

app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());

// Use Router
app.use('/admin', admin);
app.use('/restaurant', restaurant);
app.use('/user', user);
app.use('/carts', carts);
app.use('/', guest);

// port
const port = process.env.APP_PORT;
app.listen(port, () => {
    console.log('App listen on port 8080');
})