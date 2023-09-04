const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

router.post('/', (req, res) => {
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
            if (users[0].password !== password) {
                return res.status(401).send('Incorrect password');
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
});

module.exports = router;