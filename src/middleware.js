const jwt = require('jsonwebtoken');
const mysql = require('./dbconfig');

const auth = (req, res, next) => {
    if (req.headers['authorization'] &&
        req.headers['authorization'].startsWith('Bearer')) {
        const jwt_token = req.headers['authorization'].substr(7);
        req.headers.auth_token = jwt_token;
        mysql.execute('SELECT token from revoked_token where token=? and is_revoked=1', [jwt_token], (err, result, field) => {
            if (err) {
                res.send({
                    success: false,
                    msg: err
                })
            } else {
                if (result.length > 0) {
                    res.send({
                        succes: false,
                        msg: 'session expired'
                    })
                } else {
                    try {
                        const user = jwt.verify(jwt_token, process.env.APP_KEY);
                        // const who = user['username'];
                        next();
                    } catch (e) {
                        res.send({
                            success: false,
                            msg: e
                        })
                    }
                }
            }
        })
    } else {
        res.send({
            success: false,
            msg: 'You must be login first'
        })
    }
}

const roleAdmin = (req, res, next) => {
    const {
        role_id
    } = req.headers;
    if (role_id == 1) {
        next();
    } else {
        res.send('you not admin')
    }
}

const roleRestaurant = (req, res, next) => {
    const {
        role_id
    } = req.headers;
    if (role_id == 2) {
        next();
    } else {
        res.send('you not restaurant')
    }
}

const roleUser = (req, res, next) => {
    const {
        role_id
    } = req.headers;
    if (role_id == 3) {
        next();
    } else {
        res.send('you not user')
    }
}

module.exports = {
    auth,
    roleAdmin,
    roleRestaurant,
    roleUser
};