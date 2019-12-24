const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
    if (req.headers['authorization'] &&
        req.headers['authorization'].startsWith('Bearer')) {

        const jwt_token = req.headers['authorization'].substr(7);

        try {
            const user = jwt.verify(jwt_token, process.env.APP_KEY);

            next();

        } catch (e) {
            res.send({
                success: false,
                msg: e
            })
        }

    } else {
        res.send({
            success: false,
            msg: 'You must be login first'
        })
    }
}

module.exports = {
    auth
};