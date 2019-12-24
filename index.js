require('dotenv').config();

const express = require('express');
const bodyParser = require('body-parser');
const {
    auth
} = require('./src/middleware');

// ke router
const blog = require('./src/routes/blog');
const user = require('./src/routes/user');
const admin = require('./src/routes/admin');

const app = express();


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(bodyParser.json());


// pake router
app.use('/blog', auth, blog);
app.use('/user', user);
app.use('/admin', admin);

// port
const port = process.env.APP_PORT;


app.get('/', (req, res) => {
    res.send('Hello world');
})

app.post('/', (req, res) => {
    res.send(req.body);
    console.log(req.body);
})


//
app.listen(port, () => {
    console.log('App listen on port 8080');
})