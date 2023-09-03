const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const knex = require("knex")(require("../knexfile"));
require("dotenv").config();

router.post('/', (req, res) => {
    const { email, password} = req.body;
    if(!password || !email){
        return res.status(400).send('Please enter email and password')
    }
    if(!email.includes('@') || !email.includes('.')){
        return res.status(400).send('Email must be valid')
    }
    if(password.length < 8){
        return res.status(400).send('Password must be at least 8 characters')
    }
    if(password.includes('password')){
        return res.status(400).send('Are you for real?')
    }
    knex('users')
        .select('*')
        .where({email: email.toLowerCase()})
        .then((users) => {
            if (users.length) {
                res.status(409).send('Account already exists');
            } else {
                knex('users')
                    .insert({email, password})
                    .then(() => {
                        const token = jwt.sign({email}, process.env.JWT_SECRET);
                        res.status(201).send(token);
                    })
            }
        }
    )
});

module.exports = router;