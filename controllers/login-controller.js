const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile"));
const bcrypt = require('bcrypt');
const jwt_decode = require('jwt-decode');
require("dotenv").config();

const login = (req, res) => {
    const {email, password} = req.body;
    if(!password || !email){
        return res.status(400).send('Please enter email and password')
    }
    knex('users')
        .select('*')
        .where( {email: email.toLowerCase()})
        .then((users) => {
            if (!users.length) {
                return res.status(401).send('User does not exist')
            }
            const isValidPassword = bcrypt.compare(password, users[0].password);
            if (!isValidPassword) {
                return res.status(401).send('Incorrect password');
            }
            if(!users[0].verified){
                return res.status(401).send('Please verify your email');
            }
            const token = jwt.sign(
                { id: users[0].id, email: users[0].email },
                process.env.JWT_SECRET,
                { expiresIn: "24h" }
                );
        
            res.status(200).json({ token })
        })
        .catch((err) => {
            res.status(500).send('Error logging in user');
        })
}

const loginWithToken = (req, res) => {
    const {token} = req.body;
    if(!token){
        return res.status(401).send('User not authorized');
    }
    const decoded = jwt_decode(token);
    knex('users')
        .select('id')
        .where({email: decoded.email})
        .then((users) => {
            if (users.length) {
                const token = jwt.sign(
                    { id: users[0].id, email: users[0].email },
                    process.env.JWT_SECRET,
                    { expiresIn: "24h" }
                    );
                res.status(200).json({ token })
            } else {
                knex('users')
                    .insert({email: decoded.email, verified: true, password: 'password'})
                    .then(() => {
                        knex('users')
                            .select('id')
                            .where({email: decoded.email})
                            .then((users) => {
                                const token = jwt.sign(
                                    { id: users[0].id, email: users[0].email },
                                    process.env.JWT_SECRET,
                                    { expiresIn: "24h" }
                                    );
                                    return token
                                })
                                .then((token) => {
                                res.status(200).json({ token })
                            })
                    })
            }
        })
        .catch((err) => {
            res.status(500).send('Error logging in user');
        })
}


module.exports = {
    login,
    loginWithToken
};