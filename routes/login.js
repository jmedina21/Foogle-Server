const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

router.post('/', (req, res) => {
    const {username, email, password} = req.body;
    if(!password || !username && !email){
        return res.status(400).send('Please enter a username or email and password')
    }
    knex('users')
        .select('*')
        .where( username ? {username: username.toLowerCase()} : {email: email.toLowerCase()})
        .then((users) => {
            if (!users.length) {
                knex('users')
                    .select('*')
                    .where({email: email.toLowerCase()})
                    .then((users) => {
                        if (!users.length) {
                            return res.status(401).send('User does not exist');
                        }
                        if (users[0].password !== password) {
                            return res.status(401).send('Incorrect password');
                        }
                        const token = jwt.sign({username, email}, process.env.JWT_SECRET);
                        res.status(200).send(token);
                    })
                    .catch((err) => {
                        console.log(err);
                        res.status(500).send('Error logging in user');
                    })
            }
        })
        .catch((err) => {
            console.log(err);
            res.status(500).send('Error logging in user');
        })
});

module.exports = router;