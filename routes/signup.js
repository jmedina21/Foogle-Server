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
    if(!email.includes('@') || !email.includes('.')){
        return res.status(400).send('Email must be valid')
    }
    if(password.length < 8){
        return res.status(400).send('Password must be at least 8 characters')
    }
    if(password.includes(username) || password.includes(email.slice(0, email.indexOf('@')))){
        return res.status(400).send('Password must not contain username')
    }
    if(password.includes('password')){
        return res.status(400).send('Are you for real?')
    }
    knex('users')
        .where({username})
        .then((users) => {
            if (users.length) {
                res.status(409).send('Username already exists');
            } else {
                knex('users')
                    .insert({username, email, password})
                    .then(() => {
                        //send jwot token
                        const token = jwt.sign({username, email}, process.env.JWT_SECRET);
                        res.status(201).send(token);
                    })
            }
        }
    )
});

module.exports = router;