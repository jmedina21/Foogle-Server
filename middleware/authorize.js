require("dotenv").config();
const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile"));

const authorize = (req, res, next) => {
    if(!req.headers.authorization){
        return res.status(401).send('User not authorized');
    }
    const token = req.headers.authorization.split(" ")[1];
    if (!token) {
        return res.status(401).send('User not authorized');
    }
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).send('Invalid token');
        }
        knex('users')
            .select('id')
            .where({email: decoded.email})
            .then((users) => {
                if (!users.length) {
                    return res.status(401).send('User does not exist');
                }
                req.user = users[0];
                next();
            })
    })
}

module.exports = authorize;